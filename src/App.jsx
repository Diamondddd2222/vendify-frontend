import { useState } from 'react' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import './App.css'
import About from './Pages/About/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import Signup from './Pages/SignUp/SignUp.jsx'
import Login from './Pages/Login/Login.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import CreateStore from './Pages/CreateStore/CreateStore.jsx'
import StatusPage from './Pages/StatusPage/statusPage.jsx'
import BottomNav from './components/BottomNav.jsx'


function App() {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/SignUp' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path="*" element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/CreateStore' element={<CreateStore/>}/>
          <Route path='/Status' element={<StatusPage/>}/>
        </Routes>
       
        

      </BrowserRouter>
    </>
  )
}

export default App
