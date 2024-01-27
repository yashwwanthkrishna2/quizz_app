

export async function getAllQuizzes() {
    const url = "http://localhost:8000/getQuizzesWithoutQuestions"
    let _body = {
        'name': 'hello',
        'number': 1110
    }
    // console.log("BODY I AM SENDING IS = ", JSON.stringify(_body))

    let obj;

    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(_body)
    });

    obj = await res.json();


    // console.log("arr arr = ", obj)

    return obj



}

export async function getQuizQuestions ( request_body ) {

    const url = "http://localhost:8000/getQuizQuestions"

    // console.log("BODY BODY = ", request_body)


    let obj;

    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(request_body)
    });

    obj = await res.json();


    // console.log("arr arr = ", obj)

    return obj

}

export async function createQuiz( quizName, description, numQuestions, questions ) {

    // console.log("WE GOT TO REQUEST BODY")
    // console.log("=== ", request_body)

    let request_body = {
        "quiz_name": quizName,
        "description": description,
        "num_questions": numQuestions.toString(),
        "quiz_questions": questions
    }

    const url = "http://localhost:8000/createQuiz"

    // console.log("BODY BODY = ", request_body)


    let obj;

    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Access-control-allow-origin': '*'},
        body: JSON.stringify(request_body)
    });

    obj = await res.json();
    console.log("OBJ = ", obj)

    if ( obj.status_code >= 200 && obj.status_code < 300 ) {
        alert(`Created quiz: ${quizName}`)
        console.log("SUCCESS")
        window.location.replace(`http://localhost:3000/quizzes`)
    }


    // console.log("arr arr = ", obj)

    return obj

}


export async function createLeaderboardAttempt( quizName, points, numQuestions ) {

    const url = "http://localhost:8000/createLeaderboardAttempt"
    let _body = {
        'quiz_name': quizName,
        'num_correct': points,
        'num_total': numQuestions
    }

    let obj;

    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(_body)
    });

    obj = await res.json();


    console.log("OBJ GOT GOT = ", obj)

    return obj


}

export async function getLeaderboard() {

    const url = "http://localhost:8000/getLeaderboard"
    let _body = {
        'name': 'hello',
        'number': 1110
    }

    let obj;

    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(_body)
    });

    obj = await res.json();


    // console.log("leaderboard = ", obj)

    return obj

}