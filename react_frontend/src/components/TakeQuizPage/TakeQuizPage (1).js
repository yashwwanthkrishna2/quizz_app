import {React, useEffect, useState} from 'react';
import { createLeaderboardAttempt, getQuizQuestions } from '../../api/helper/QuizApi';
import { Button } from 'react-bootstrap';
import './TakeQuizPage.css'; // Import your CSS file
import App from '../../App';



const TakeQuizPage = ({

}) => {

    const [questions, setQuestions] = useState([])
    const [points, setPoints] = useState(0)
    const [qIndex, setQIndex] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState()
    const [completedFlag, setCompletedFlag] = useState(false)

    const [quizName, setQuizName] = useState("")
    const [numQuestions, setNumQuestions] = useState(0)





    const handleOptionSelect = ( selected_answer ) => {

        console.log("NOTE NOTE: the option selected is ===== ", selected_answer)
        console.log("correct answer = ", currentQuestion.correct_answer)
        console.log("EQUALITY? = ", ( selected_answer === currentQuestion.correct_answer ))

        if( selected_answer === currentQuestion.correct_answer ) {

            setPoints(points + 1);

            if ( !(qIndex >= questions.length) ) {
                setQIndex( qIndex + 1 )
                setCurrentQuestion( questions[ qIndex ] )

            }
            else {
                setCompletedFlag(true)

                createLeaderboardAttempt( quizName, ( points + 1 ), numQuestions );
            }


            alert(`CORRECT!!!!!`)

        }
        else {
            alert(`WRONG: The correct answer was ${currentQuestion.correct_answer}`)
            if ( !(qIndex >= questions.length) ) {
                setQIndex( qIndex + 1 )
                setCurrentQuestion( questions[ qIndex ] )

            }
            else {
                setCompletedFlag(true)

                createLeaderboardAttempt( quizName, points, numQuestions );
            }
        }

    };



    

    useEffect(() => {


        const fetchDataFromParams = () => {

            const url = window.location.search

            const params = new URLSearchParams(url);

            const _id = params.get('id');
            const _quiz_name = params.get('quiz_name');
            const _num_questions = params.get('num_questions');

            return {
                "id": _id,
                "quiz_name": _quiz_name,
                "num_questions": _num_questions
            }


        }

        const fetchQuizQuestions = async ( request_body ) => {

            let to_return = await getQuizQuestions( request_body );

            setQuestions(to_return)
            setCurrentQuestion(to_return[0])

            setQuizName( request_body.quiz_name )
            setNumQuestions( request_body.num_questions )

        }

        
        let request_body = fetchDataFromParams()

        fetchQuizQuestions( request_body )





    }, [])

    // add selected option to the question document    

    // console.log("CURRENT QUESTION = ", currentQuestion)
    

    return(
        
        <>
            <h1>Score = {points}/{questions.length}</h1>
            <Button onClick={(e) => { window.location.replace(`http://localhost:3000/quizzes`) }}>Back to Quizzes</Button>
            <br/>
            <br/>

            { !completedFlag ? 

            <>
            
    { currentQuestion ? 
            
        <div className='quiz-card'>

        <>
            <div className='question-section'>
                <div className='question-count'>
                    <span>Question </span>{qIndex}/{questions.length}
                </div>
                <div className='question-text'>{currentQuestion.question}</div>
            </div>
            <div className='answer-section'>
                <button value="A" onClick={ (e) => { handleOptionSelect(e.target.value) } }>A: {currentQuestion.A}</button>
                <button value="B" onClick={ (e) => { handleOptionSelect(e.target.value) } }>B: {currentQuestion.B}</button>
                <button value="C" onClick={ (e) => { handleOptionSelect(e.target.value) } }>C: {currentQuestion.C}</button>
                <button value="D" onClick={ (e) => { handleOptionSelect(e.target.value) } }>D: {currentQuestion.D}</button>
            </div>
        </>

        </div>       
: 
<div>NOTHING</div>


}         
            
            </>


            
            :

            <>
                <div>THANK YOU FOR COMPLETING THE QUIZ! YOUR RESPONSE WAS RECORDED</div> 

                <Button variant="primary" onClick={ (e) => { window.location.replace(`http://localhost:3000/quizzes`) } } >Home</Button>
                <br/>
                <br/>
                <Button variant="primary" onClick={ (e) => { window.location.reload() } }>Retake</Button>
                <br/>
                <br/>
                <Button onClick={(e) => { window.location.replace(`http://localhost:3000/leaderboard`) }}>Leaderboard</Button>

            </>


            }







        </>
    );

};


export default TakeQuizPage;