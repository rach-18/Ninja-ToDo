import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneralTasks from './components/General Tasks/GeneralTasks';
import './App.css'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/general-tasks' element={<GeneralTasks />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
