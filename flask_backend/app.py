from flask import Flask
from flask import jsonify
from flask import request, flash
from flask import Response
from flask_cors import CORS
import json
from datetime import datetime
import pytz
import os

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter


cred = credentials.Certificate("../serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


app = Flask("__name__")
cors = CORS(app)

@app.route("/", methods=['GET', 'POST'])
def index():
    return {"type_return": "howdy"}

@app.route("/getQuizzesWithoutQuestions", methods=['POST'])
def test():
    _data = request.get_json()
    print(f"REQUST = {_data}")


    collection_ref = db.collection('quizzes')


    docs = collection_ref.stream()

    data = []

    for doc in docs:
        data_entry = {
            "id": doc.id,
            "data": doc.to_dict()
        }

        data.append(data_entry)
    
    print(f"ARRAY = {data}")
    
    return json.dumps(data)

@app.route("/getQuizQuestions", methods=['POST'])
def getQuizQuestions():

    _data = request.get_json()
    _id = _data["id"]

    quiz_questions_ref = db.collection('quizzes').document(_id).collection('quiz_questions')

    quiz_questions_collection = [doc.to_dict() for doc in quiz_questions_ref.stream()]
    print(f"\n\nCollection = {quiz_questions_collection}  \n\n")


    return jsonify(quiz_questions_collection)

@app.route("/createQuiz", methods=['POST'])
def createQuiz():


    _data = request.get_json()
    question_array = _data['quiz_questions']
    print(f"request = {_data}")


    toAdd = { 
        "quiz_name":  _data['quiz_name'],
        "description": _data['description'],
        "num_questions": _data['num_questions']
    }
    # for question in _data:
    #     db.collection("quizzes").document("9TzOwcdGT12L6iOQ9azy").set(question)

    # doc_ref = db.collection("quizzes").add(_data)

    doc_ref = db.collection("quizzes").add(toAdd)

    for question in question_array:
        db.collection("quizzes").document(doc_ref[1].id).collection("quiz_questions").add(question)


    return { "status_code": 200 }

@app.route("/createLeaderboardAttempt", methods=['POST'])
def createLeaderboardAttempt():
    _data = request.get_json()

    # ------------------ START: BOILER PLATE TO GET NY TIME/EASTERN TIME ZONE  ------------------

    tz_NY = pytz.timezone('America/New_York') 

    datetime_NY = datetime.now(tz_NY)

    print("NY time:", str(datetime_NY.strftime("%D %T US Eastern Time")))
    
    date_string = datetime_NY.strftime("%Y%m%d%H%M%S")


    # ------------------ END: BOILER PLATE TO GET NY TIME/EASTERN TIME ZONE  --------------------

    time_str = str(datetime_NY.strftime("%D %T US Eastern Time"))

    toAdd = { 
        "quiz_name":  _data['quiz_name'],
        "num_correct": _data['num_correct'],
        "num_total": _data['num_total'],
        "time": time_str,
        "sort_by": int(date_string)
    }

    db.collection("leaderboard").add(toAdd)


    return { "status_code": 200 }


@app.route("/getLeaderboard", methods=['POST'])
def getLeaderboard():

    # leaderboard_collection = [doc.to_dict() for doc in leaderboard_ref.stream()]
    # print(f"\n\nCollection = {leaderboard_collection}  \n\n")


    leaderboard_ref = db.collection('leaderboard')


    docs = leaderboard_ref.stream()

    data = []

    for doc in docs:
        _data = doc.to_dict()
        data_entry = {
            "id": doc.id,
            "num_correct": _data['num_correct'],
            "num_total": _data['num_total'],
            "quiz_name": _data['quiz_name'],
            "sort_by": _data['sort_by'],
            "time": _data['time']
        }

        data.append(data_entry)
        # print(f"DOC = {doc}")
    
    # print(f"ARRAY = {data}")
    
    return json.dumps(data)


if __name__ == "__main__":
    app.run(port=8000, debug=True)
