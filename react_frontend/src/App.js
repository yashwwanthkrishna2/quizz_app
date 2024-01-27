import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import WelcomePage from './components/WelcomePage/WelcomePage';
import QuizzesPage from './components/QuizzesPage/QuizzesPage';
import TakeQuizPage from './components/TakeQuizPage/TakeQuizPage';
import CreateQuizPage from './components/CreateQuizPage/CreateQuizPage';
import Leaderboard from './components/Leaderboard/Leaderboard';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage/>} />
          <Route path="/quizzes" element={<QuizzesPage/>} />
          <Route path="/takeQuiz" element={<TakeQuizPage/>} />
          <Route path="/createQuiz" element={<CreateQuizPage/>} />
          <Route path="/leaderboard" element={<Leaderboard/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
