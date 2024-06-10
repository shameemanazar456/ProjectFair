import { useContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Dashboard from './Pages/Dashboard'
import Auth from './Pages/Auth'
import Footer from './components/Footer'
import MyProject from './components/MyProject'
import { isAuthorizedContext } from './context/Context'

function App() {

  const {isAuthorized} = useContext(isAuthorizedContext)
  

  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/project' element={<Project/>}/>
    <Route path='/dashboard' element={isAuthorized?<Dashboard dashboard = {true}/>:<Home/>}/>
    <Route path='/login' element={<Auth />}/>
    <Route path='/register' element={<Auth register/>}/>

    </Routes>
    
    <Footer/>
    </>
  )
}

export default App
