import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='mt-5 p-5 w-100 d-flex justify-content-center alighn-items-center flex-column ' style={{backgroundColor:'#0ee3c7'}}>

        <div className='row mx-md-5 mx-ms-3 mt-4'>
            <div className="col-md-4">
                <h3 className='text-light'><FontAwesomeIcon className='me-2' icon={faStackOverflow} />Project Fair</h3>
                <p className = "text-dark" style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste minima, necessitatibus odio rerum sed amet rem, </p>
            </div>
            <div className="col-md-1"></div>

            <div className="col-md-1 ">
                <h3 className='text-light'>Links</h3>
                <Link to={'/'}><p className='text-dark' style={{textDecoration:'none'}} >Home</p></Link>
                <Link style={{textDecoration:'none'}} to={'/projects'}><p className='text-dark'>Projects</p></Link>
                <Link style={{textDecoration:'none'}} to={'/dashboard'}><p className='text-dark'>DashBoard</p></Link>

            </div>
            <div className="col-md-1"></div>

            <div className="col-md-2">
            <h3 className='text-light'>Guides</h3>
                <Link to={'https://react.dev'}><p className='text-dark' style={{textDecoration:'none'}} >React</p></Link>
                <Link style={{textDecoration:'none'}} to={'https://react-bootstrap.netlify.app/'}><p className='text-dark'>React Bootstrap</p></Link>
                <Link style={{textDecoration:'none'}} to={'https://bootswatch.com'}><p className='text-dark'>React BootsWatch</p></Link>


            </div>
            <div className="col-md-3">
                <h3 className='text-light'>Contact Us</h3>
                <div className='d-flex'>
                    <input className='form-control me-2' type="text " placeholder='Enter Email Id' />
                    <button className='btn btn-warning'>Subscribe</button>
                </div>
                <div className='d-flex justify-content-between mt-4 ms-3'>
                <FontAwesomeIcon className='fa-2x text-light' icon={faInstagram} />
                <FontAwesomeIcon className='fa-2x text-light' icon={faTwitter} />
                <FontAwesomeIcon className='fa-2x text-light' icon={faLinkedin} />
                <FontAwesomeIcon className='fa-2x text-light' icon={faFacebook} />

                </div>
            </div>
            <div className="col-md-1"></div>
        </div>

    <p className='text-light text-center mt-4'>CopyRight © 2024 Project Fair. Built With React</p>
    </div>
    
    </>
  )
}

export default Footer
