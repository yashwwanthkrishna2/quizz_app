import { React, useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { createQuiz } from '../../api/helper/QuizApi';


let _key = 0

const CreateQuizPage = ({

}) => {

    const [questions, setQuestions] = useState([{
        "id": _key,
        "question": "",
        "A": "",
        "B": "",
        "C": "",
        "D": "",
        "correct_answer": ""
    }])

    const [quizName, setQuizName] = useState("")
    const [description, setDescription] = useState("")
    const [numQuestions, setNumQuestions] = useState(1)


    // const [key, setKey] = useState(1)


    const addQuestion = () => {


        _key += 1;
        let temp = questions
        temp.push({
            "id": _key,
            "question": "",
            "A": "",
            "B": "",
            "C": "",
            "D": "",
            "correct_answer": ""
        })

        alert(`Added new question below`)

        setNumQuestions( numQuestions + 1 )

        console.log("AFTER ADDED QUESTIONS = ", temp)


        return temp



    }

    const updateQuizQuestion = (passed_id, _type, _value) => {

        console.log("ID ID ID DI = ", passed_id )

        let _id = -100

        for ( let i = 0; i < numQuestions; i += 1 ) {

            if ( questions[i].id === passed_id ) {
                
                _id = i

            }

        }

        switch (_type) {

            case "question":
                // code block
                questions[_id].question = _value
                break;

            case "A":
                // code block
                questions[_id].A = _value
                break;

            case "B":
                // code block
                questions[_id].B = _value
                break;

            case "C":
                // code block
                questions[_id].C = _value
                break;

            case "D":
                // code block
                questions[_id].D = _value
                break;

            case "correct_answer":
                // code block
                questions[_id].correct_answer = _value
                break;

            default:
                // code block
                // console.log("updated question = ", questions[_id])

        }
        // console.log("updated question = ", questions[_id])

        return

    };

    const removeQuestion = ( selected_id ) => {

        let current_questions = questions        

        for ( let i = 0; i < current_questions.length; i += 1 ) {

            if ( current_questions[i].id === selected_id ) {
                
                current_questions.splice(i, 1)

                console.log("current questions = ", current_questions)

                let new_num_questions = numQuestions - 1

                setNumQuestions(new_num_questions)

                alert(`Deleted your desired question!`)

                return current_questions

            }


        }

        return current_questions
    }

    console.log("QUESTIONS QUESTIONS = ", questions)

    return (
        <div>
            <h1>Create Quiz!! Add questions below, press 'Submit' when done</h1>
            <Button onClick={(e) => { window.location.replace(`http://localhost:3000/quizzes`) }}>Back to Quizzes</Button>
            <br/>
            <br/>
            <Button onClick={ (e) => { let _add = addQuestion(); setQuestions(_add.slice(0)); }}>Add Question</Button>
            <br/>
            <br/>

            <span>Quiz Name</span>
            <input type="text" defaultValue="" onChange={ (e) => { setQuizName(e.target.value) } }/>
            <br/>
            <span>Description</span>
            <br/>
            <textarea type="text" defaultValue="" onChange={ (e) => { setDescription(e.target.value) } }>

            </textarea>


            <br/>
            <span>Number of Questions: {numQuestions}</span>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
            {questions.map(question => (
                <Card key={question.id} className="quizzes-page-card">

                    <Card.Title>New Question</Card.Title>
                    <Card.Body>

                        <Card.Text>Question</Card.Text>
                        <input type="text" defaultValue={question.question} onChange={(e) => { updateQuizQuestion(question.id, "question", e.target.value) }} />
                        <br/>
                        <br/>
                        <Card.Text>Option A:</Card.Text>
                        <input type="text" defaultValue={question.A} onChange={(e) => { updateQuizQuestion(question.id, "A", e.target.value) }} />
                        <br/>
                        <br/>
                        <Card.Text>Option B:</Card.Text>
                        <input type="text" defaultValue={question.B} onChange={(e) => { updateQuizQuestion(question.id, "B", e.target.value) }} />
                        <br/>
                        <br/>
                        <Card.Text>Option C:</Card.Text>
                        <input type="text" defaultValue={question.C} onChange={(e) => { updateQuizQuestion(question.id, "C", e.target.value) }} />
                        <br/>
                        <br/>
                        <Card.Text>Option D:</Card.Text>
                        <input type="text" defaultValue={question.D} onChange={(e) => { updateQuizQuestion(question.id, "D", e.target.value) }} />
                        <br/>
                        <br/>
                        <Card.Text>CORRECT ANSWER ( A, B, C, D )</Card.Text>
                        <input type="text" defaultValue={question.correct_answer} onChange={(e) => { updateQuizQuestion(question.id, "correct_answer", e.target.value) }} />

                        { numQuestions > 1 ? 

                            <>
                                <br/>
                                <br/>
                                <Button variant="danger" onClick={ (e) => { let _remove = removeQuestion(question.id); setQuestions(_remove.slice(0)); } } >Delete Question</Button>                            
                                <br/>
                                <br/>
                            </>
        
                        :

                        <></>

                        }

                    </Card.Body>
                </Card>
            ))}
            </div>
            <Button onClick={ (e) => { createQuiz( quizName, description, numQuestions, questions ) } }>Create Quiz</Button>
            <br/>
            <br/>


        </div>
    );

};

export default CreateQuizPage;