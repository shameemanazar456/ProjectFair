import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { Col, Row, ToastContainer } from 'react-bootstrap'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/baseUrl';
import { toast } from 'react-toastify';
import { updateProjectApi } from '../services/allApi';
import {  editProjectResponseContext } from '../context/Context';


function EditProject({project}) {
  const {setEditResponse} = useContext(editProjectResponseContext)
  const [update,setUpdate] = useState({
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImage:""
  })
  const [preview1, setPreview1] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      handleClose1()
    }
    const handleShow = () => setShow(true);
    const handleClose1 = () =>{
     setUpdate({
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
      projectImage:""
     }) 
     setPreview1("")
    }
    


    const handleUpdate = async(e)=>{
      e.preventDefault()
      const {title,language,github,website,overview,projectImage}=update
      if(!title || !language || !github || !website || !overview){
        toast.info('Please Fill the Form Completley')
      }
      else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview1?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

        const token = sessionStorage.getItem("token")
        if(preview1){
          const reqHeader ={
            "Content-Type":"multipart/form-data",
            //for token based authorization we shold use Bearer key which is followed by single space and then token
            "Authorization":`Bearer ${token}`
          }
          const result = await updateProjectApi(project._id,reqBody,reqHeader)
          console.log(result);
          if(result.status == 200){
            //toast.success('Updated Successfully')
            setShow(false)
            setEditResponse(result.data)

          }
          else{
            toast.error('Something Went Wrong')
          }


        }
        else{
          const reqHeader ={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await updateProjectApi(project._id,reqBody,reqHeader)
          console.log(result);
          if(result.status == 200){
            //toast.success('Updated Successfully')
            setShow(false)
            setEditResponse(result.data)
          }
          else{
            toast.danger('Something Went Wrong')
          }
      }
    }
  }

  useEffect(()=>{
    if(update.projectImage){
     setPreview1( URL.createObjectURL(update.projectImage))
    }
  },[update.projectImage])
  console.log(project.projectImage);
  return (
    <>
      <FontAwesomeIcon onClick={handleShow} className='me-3' icon={faPenToSquare} style={{color: "#adc0e1",}} />
      <Modal show={show} size='lg' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={5}>
                    <label htmlFor="image">
                      <input id='image' type="file" style={{display:'none'}} onChange={(e)=>setUpdate({...update,projectImage:e.target.files[0]})} />
                      <img src={preview1?preview1:`${serverUrl}/uploads/${project.projectImage}`} alt=" no image" className='w-75 m-4' />
                    </label>
                </Col>
                <Col sm={12} md={7}>
                <div><input type="text" placeholder='Project Title' value={update.title} onChange={(e)=>setUpdate({...update,title:e.target.value})} className='form-control mt-3' /></div>
<div>
                  <input type="text" placeholder='Language Used' value={update.language} onChange={(e)=>setUpdate({...update,language:e.target.value})}  className='form-control mt-3' />
  
</div>                
                  <div><input type="text" placeholder='Github Link' value={update.github}  onChange={(e)=>setUpdate({...update,github:e.target.value})} className='form-control mt-3' /></div>
                <div><input type="text" placeholder='Website Link' value={update.website} onChange={(e)=>setUpdate({...update,website:e.target.value})}   className='form-control mt-3' /></div>

                <div><textarea rows={4} placeholder='Project Overview' value={update.overview} onChange={(e)=>setUpdate({...update,overview:e.target.value})}  className='form-control mt-3' /></div>
                </Col>

            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn btn-success' onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal> 
      <ToastContainer theme='colored'  position='top-center' autoClose={2000} />
    </>
  )
}

export default EditProject
