import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneralTasks from './components/General Tasks/GeneralTasks';
import './App.css'
import Footer from './components/Footer/Footer';
import { TaskProvider } from './context/TaskContext';
import LandingPage from './components/Landing Page/LandingPage';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/general-tasks' element={<GeneralTasks />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
