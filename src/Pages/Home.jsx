import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../assets/homeimage.jpg'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allApi'

function Home() {
  const [islogin, setIsLogin]=useState(false)
  const [homeProject, setHomeProject]= useState([])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
    getHomeProject()
  },[])

  const getHomeProject = async()=>{
    const result = await getHomeProjectApi()
    console.log(result);
    setHomeProject(result.data)
  }
  console.log(homeProject);
  return (
    <>
      <div className="container-fluid w-100 " style={{backgroundColor:'#0ee3c7', height:'100vh'}}>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 className='text-light' style={{fontSize:'76px'}}>Project Fair</h1>
            <p className='mt-3'>One Stop Destination for all Software Development Project</p>
            {!islogin?
            <button className='btn btn-warning'><Link to={'/login'} style={{textDecoration:'none', color:'white'}}>Get Started <FontAwesomeIcon className='ms-2' icon={faArrowRight} /></Link></button>
            :
            <button className='ms-2 btn btn-warning'><Link to={'/dashboard'} style={{textDecoration:'none', color:'white'}}>Manage Project</Link> <FontAwesomeIcon className='ms-2' icon={faArrowRight} /></button>}

          </Col>
          <Col sm={12} md={6}>
            <img className='w-100 mt-5 rounded' src={titleImage} alt="Image" />
          </Col>
        </Row>
      </div>
      <div className=''>
            <h1 className='mt-5 text-center'>Explore Our Projects</h1>
            <marquee scrollAmount={20}>
              <div className='d-flex'>
                {homeProject?.map((item)=>(
                <ProjectCard project={item}/>
              ))
              }
               
              </div>
            </marquee>

            <Link to={'/project'}> <p className='text-center mt-4 text-danger'>See more Projects</p></Link>
      </div>
    </>
  )
}

export default Home
