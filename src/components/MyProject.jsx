import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { AddProjectREsponseStatusContext } from '../context/Context';
//addproject
function MyProject() {
  const {setAddResponse} = useContext(AddProjectREsponseStatusContext)
  //state to hold project deatils
  const [projectDetails, setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    overView:"",
    website:"",
    projectImage:""
  })
  const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);
    const [key, setKey] = useState(false)
    const [token, setToken] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = ()=>{
      setProjectDetails({
        title:"",
        language:"",
        github:"",
        overView:"",
        website:"",
        projectImage:""
      })
      setPreview("")
      setKey(!key)
    }

    //function to add data
    const handleAdd =async(e)=>{
      //prevent data lose
      e.preventDefault()
      const {title, language, github, website, overView, projectImage}= projectDetails
      if(!title || !language || !github || !website ||!overView || !projectImage){
        toast.info('Please fill the form completly ')
      }
      else{
        //how to handle uploaded content
        //1) create an object for formdata class
        const reqBody = new FormData()
        //2) append method is used to add data to the body
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overView)
        reqBody.append("projectImage",projectImage)
      
      if(token){
        let reqHeader = {
          "Content-Type":"multipart/form-data",
          //for token based authorization we shold use Bearer key which is followed by single space and then token
        
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectApi(reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          handleClose1()
          handleClose()
          setAddResponse(result.data)
        }
        else{
          toast.error('something Went Wrong')
          handleClose1()
          handleClose()
        }

      }}
    }


    console.log(projectDetails);
    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
      else{
        setToken("")
      }
    },[])
    console.log(token);
    useEffect(()=>{
      //file converted to url
      if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
      }

    },[projectDetails.projectImage])
    console.log(preview);
  return (
    <>

    <div>
    <Button variant="primary" onClick={handleShow}>
       Add Project
      </Button>

      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={5}>
                    <label htmlFor="image">
                      <input id='image' key={key} onChange={(e)=>setProjectDetails({...projectDetails, projectImage:e.target.files[0]})} type="file" style={{display:'none'}}/>
                      <img src={preview?preview:"https://i.pinimg.com/474x/e8/ee/07/e8ee0728e1ba12edd484c111c1f492f2.jpg"} alt=" no image" className='w-75 m-4' />
                    </label>
                </Col>
                <Col sm={12} md={7}>
                <div><input type="text" value={projectDetails.title} placeholder='Project Title' onChange={(e)=>setProjectDetails({...projectDetails, title:e.target.value})} className='form-control mt-3' /></div>
<div>
                  <input type="text" value={projectDetails.language} placeholder='Language Used' onChange={(e)=>setProjectDetails({...projectDetails, language:e.target.value})} className='form-control mt-3' />
  
</div>                
                  <div><input type="text" value={projectDetails.github} placeholder='Github Link' onChange={(e)=>setProjectDetails({...projectDetails, github:e.target.value})} className='form-control mt-3' /></div>

                <div><input type="text" value={projectDetails.website} placeholder='Website Link' onChange={(e)=>setProjectDetails({...projectDetails, website:e.target.value})} className='form-control mt-3' /></div>

                <div><textarea rows={4} placeholder='Project Overview' value={projectDetails.overView} onChange={(e)=>setProjectDetails({...projectDetails, overView:e.target.value})} className='form-control mt-3' /></div>
                </Col>

            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button className='btn btn-success' onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>    </div>

      <ToastContainer theme='colored'  position='top-center' autoClose={2000} />
      
    </>
  )
}

export default MyProject
