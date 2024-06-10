import React, { useContext, useEffect, useState } from 'react'
import MyProject from './MyProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import EditProject from './EditProject'
import { deleteAProjectApi, getUserProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { editProjectResponseContext } from '../context/Context'

function MyProjectDisplay() {
  const {editResponce}= useContext(editProjectResponseContext)
  const [userProject,  setUserProject] = useState([])

  const getAllUserProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
       "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await getUserProjectApi(reqHeader)
      setUserProject(result.data);
    }
  
  }
  const deleteProject = async(id)=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
       "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await deleteAProjectApi(id, reqHeader)
      console.log(result);
      if(result.status == 200){
        getAllUserProject()
      }
      else{
        alert('something went wrong')
      }
    }
  }
  useEffect(()=>{
getAllUserProject()
  },[editResponce])
  return (
    <div className='m-5 shadow p-3 rounded'>
        <div className="d-flex">
            <h3 className='text-success mt-4'>My Project </h3>
            <div className='ms-auto mt-4'><MyProject/></div>
        </div>
        {userProject?.length>0?
         userProject?.map((item)=>(<div className='d-flex mt-4  bg-light rounded p-3'>
         <h5>{item.title}</h5>
        <div className='ms-auto '> 
        <EditProject project = {item}/>
        
        <Link to={item.github} target='_blank'><FontAwesomeIcon className='me-3' icon={faGithub} style={{color: "#4fc6e3",}} /></Link>
        <FontAwesomeIcon onClick={()=>deleteProject(item._id)} className='me-3' icon={faTrash} style={{color: "#fa0032",}} />
        </div>
     </div>)) :
        <p className='text-danger mt-3'>No Projects Added Yet</p>
        }
      
    </div>
  )
}

export default MyProjectDisplay
