import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddQuiz from './pages/AddQuiz';
import Trivia from './pages/Trivia';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import {Toaster} from 'react-hot-toast';
import QuizStart from './pages/QuizStart';
import Leaderboard from './pages/Leaderboard';
import LiveQuiz from './pages/LiveQuiz';
import Code from './pages/Code';
import FAQ from './pages/FAQ'

function App() {
  return (
    <Router>
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/addQuiz' element={<AddQuiz />} />
        <Route path='/trivia' element={<Trivia />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/quizStart' element={<QuizStart />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/live' element={<LiveQuiz />} />
        <Route path='/code' element={<Code/> } />
        <Route path='/FAQ' element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
