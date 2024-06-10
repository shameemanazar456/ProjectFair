import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi, registerAPI } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthorizedContext } from '../context/Context'


function Auth({register}) {

  const {setIsAuthorized} = useContext(isAuthorizedContext)

  // state to hold the user details

  const [user, setUser] = useState({
    username :"",
    email:"",
    password:""
  })

  const navigate =  useNavigate()
  console.log(user);
  const registerForm = register?true:false

const getRegister = async (e)=>{
  e.preventDefault();
  const {username, email, password} = user
  if(!username || !email || !password){
    toast.info('Plaese Fill the Form Completly')
  } 
  else{
    const response = await registerAPI((user))
    console.log(response);
    if(response.status==200){
      toast.success("Registration Successfull")
      setUser({
        username :"",
        email:"",
        password:""
      })
      navigate('/login')
    }
    else{
      toast.error(response.response.data)
    }
  }
}

//function to login

const userLogin = async(e)=>{
  e.preventDefault()
  const {email, password} = user
  if(!email || !password){
    toast.info('Please fill from completley')
  }
  else{
    const result = await loginApi(user)
    console.log(result);
    if(result.status == 200){
        toast.success('Login Successful')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUser({
          username:"",
          email:"",
          password:""
        })
        setTimeout(()=>{
          navigate('/')
        },3000)
        setIsAuthorized(true)
      console.log(result);
    }
    else{
      toast.warning('Error')
      console.log(result);
    }
  }
}
  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column  ' style={{ height: '100vh' }}>
      <div className='w-75  container'>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }} >
          <h5> <FontAwesomeIcon icon={faArrowLeft} />Back to Home </h5>

        </Link>      
        <div style={{ backgroundColor: '#0ee3c7' }} className='rounded mt-3' >
          <Row>
            <Col sm={12} md={6} className='p-5'>
              <img src="https://cdn-icons-png.flaticon.com/512/4661/4661334.png" alt="" style={{width:'100%'}} />
            </Col>
            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column'>
              <h2 className='text-light' > <FontAwesomeIcon className='me-1 fa-2x' icon={faStackOverflow} /> <b>Project Fair</b></h2>
{ registerForm?             <h6 className='text-light'>Sign Up to Your Account</h6>:
              <h6 className='text-light'>Sign In to Your Account</h6>}

              <Form className='mt-4 w-75 '>
                { registerForm && <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control value={user.username} onChange={(e)=>setUser({...user, username:e.target.value})} type="email" placeholder="Enter User Name" />
                </Form.Group>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})}  type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control onChange={(e)=>setUser({...user, password:e.target.value})}  type="password"  value={user.password} placeholder="Password" />
                </Form.Group>
              { registerForm? <div>
                  <Button onClick={getRegister} className='w-100' variant="warning" type="submit">Register</Button>
                  <p className='text-light mt-3'>Already a User? Click here to <Link to={'/login'} className='text-danger'>Login</Link></p>
               </div>:

               <div>
                 <Button className='w-100' onClick={userLogin} variant="warning" type="submit">Login</Button>
                  <p className='text-light mt-3'>New User? Click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
  
               </div>}
              </Form>

            </Col>

          </Row>
        </div>

      </div>
      <ToastContainer theme='colored' autoClose={2000} position='top-center'/>
    </div>
  )
}

export default Auth
