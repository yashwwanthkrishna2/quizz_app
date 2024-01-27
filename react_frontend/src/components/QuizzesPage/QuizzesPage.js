import { React, useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { getAllQuizzes } from '../../api/helper/QuizApi';
import './QuizzesPage.css'; // Import your CSS file
import Leaderboard from '../Leaderboard/Leaderboard';



const QuizzesPage = ({



}) => {

    const [quizzes, setQuizzes] = useState([])

    let _quizzes;


    useEffect(() => {

        const fetchData = async () => {

            const response = await getAllQuizzes()
            setQuizzes(response);

        }

        fetchData()


    }, [])

    const startQuiz = (quiz_id, quiz_name, num_questions) => {

        console.log("QUIZ SELECTED = ", quiz_id)
        window.location.replace(`http://localhost:3000/takeQuiz?id=${quiz_id}&quiz_name=${quiz_name}&num_questions=${num_questions}`)

    };



    // console.log("quizzes = ", quizzes)


    return (
        <>
            <h1>Would you like to create your own quiz? Click below</h1>
            <Button onClick={(e) => { window.location.replace(`http://localhost:3000/leaderboard`) }}>Leaderboard</Button>
            <br/>
            <br/>
            <Button onClick={(e) => { window.location.replace(`http://localhost:3000/createQuiz`) }}>Create a Quiz</Button>

            <h1 className="mt-4 mb-4">All Quizzes</h1>

            {quizzes.length !== 0 ?


                <Row>
                    {quizzes.map(quiz => (
                        <Col key={quiz.id} md={4} className="mb-4">
                            <Card key={quiz.id} className="quizzes-page-card">

                                <Card.Title>QUIZ: {quiz.data.quiz_name}</Card.Title>
                                <Card.Body>

                                    <Card.Text>DESCRIPTION: {quiz.data.description}</Card.Text>
                                    <Card.Text>NUMBER OF QUESTIONS: {quiz.data.num_questions}</Card.Text>

                                    <Button variant="primary" onClick={(e) => { startQuiz(quiz.id, quiz.data.quiz_name, quiz.data.num_questions) }}>TAKE THIS QUIZ</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                :
                <h1>NOTHING</h1>

            }


        </>
    );

};

export default QuizzesPage;
