import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { isAuthorizedContext } from '../context/Context';
function Header({dash}) {
  const {setIsAuthorized} = useContext(isAuthorizedContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    toast.error('Logout Sussessfully')
   setTimeout(()=>{
    navigate('/')
   },3000)
    setIsAuthorized(false)
  }
  return (
    
       <>
         <Navbar className="w-100 px-5" style={{backgroundColor:'#0ee3c7'}}>
          
           <Link to={'/'} style={{textDecoration:'none'}}>
                <Navbar.Brand className='text-light'>
                <FontAwesomeIcon className='me-1 fa-2x' icon={faStackOverflow}  />
                <span className='fs-3'>  <b>Project Fair</b></span>
                </Navbar.Brand>
           </Link>
  { dash &&        <button onClick={handleLogout} className='btn btn-warning ms-auto'> <FontAwesomeIcon className='me-2' icon={faPowerOff} />LogOut</button>
  }      
  
        </Navbar>
        <ToastContainer theme='colored' autoClose={2000} position='top-center'/>

       </>

    
  )
}

export default Header
