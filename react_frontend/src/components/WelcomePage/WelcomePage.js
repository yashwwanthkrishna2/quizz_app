import { React, useState } from 'react';
import { getAllQuizzes } from '../../api/helper/QuizApi';

const WelcomePage = ({


}) => {    
    
    let [quizArray, setQuizArray] = useState("LOLOLOL");

    return(
        <>
         <h1>Welcome to our COSC 6050 Quiz application</h1>
         <h2>By Sil Apostu, Abir Golam, Kishore Kilaru, Hameed Shaik, and Krishna Y. Popuri</h2>
         {/* <button onClick={ (e) => { getAllQuizzes() } }>yoyo</button> */}
         <button onClick={(e) => { window.location.replace("http://localhost:3000/quizzes") }} > Go to Quiz Page</button>
        </>
    );

};

export default WelcomePage;