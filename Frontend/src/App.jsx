
import Navbar from './components/Header/Navbar'
import Login from './components/Admin/Login'
import Register from './components/Admin/Register'
import Topic from './components/Topic/CreateTopic'
import TopicCard from './components/Topic/TopicCard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuestionList from './components/Question/QuestionList'
import { Button } from './components/Admin/Button'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/questions/:topicId' element={<QuestionList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addTopic' element={<Topic />} />
        <Route path='/topics' element={<TopicCard />} />
        <Route path='/admin' element={<Button/>}/>
      </Routes>
    </Router>
  )
}

export default App
