import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allApi'

function Project() {
  const [allProject, setAllProject] = useState([])
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      getAllProject()
    }
  },[searchKey])

  const getAllProject = async()=>{
    const result = await allProjectApi(searchKey)
    setAllProject(result.data)
  }
  console.log(allProject);
  console.log(searchKey);
  return (
    <>
      <Header/>
     
      <div className='mt-5'>
        <h2 className='text-center'>All Projects</h2>
        </div>
        { token ?
      <div>
        <div className='row mt-5 d-flex justify-content-center w-100'>
            <div className="col-md-4"></div>
            
            <div className=' d-flex justify-content-center'>
              <input type="text" className='form-control w-50 w-md-75 ' placeholder='Search by Technologies' onChange={(e)=>setSearchKey(e.target.value)} />
              <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} style={{marginTop:'11px', marginLeft:'-30px'}} />
          
            </div>
            <div className="col-md-4"></div>
          </div>
       {allProject?.length>0?

        
        <div>
          
          <Row className='mt-5'>
            {allProject.map((item)=>(
            <Col sm={12} md={6} lg={4} className='p-3'>
           <ProjectCard project={item}/> 
           </Col>))}
          </Row>
        </div>:
        <div className='mt-5'>
          <h1 className='text-danger text-center fs-3'> No Project to display</h1>
        </div>
      }
      </div>:
      <div className='d-flex justify-content-center align-items-center flex-column mt-3'>
        <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" className='rounded' alt=""  style={{width:'15%'}}/>
        <h3 className='mt-4 text-danger'> Please <Link to={'/login'}> Login</Link> to See More Project</h3>

      </div>
      }
    </>
  )
}

export default Project
