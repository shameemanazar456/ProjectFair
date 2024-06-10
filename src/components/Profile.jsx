import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { serverUrl } from '../services/baseUrl';
import {  updateProfileApi } from '../services/allApi';
import { toast } from 'react-toastify';
import { Col, Row, ToastContainer } from 'react-bootstrap'


function Profile() {
    const [open, setOpen] = useState(false);

    const [userDetails, setUserDeatils] = useState({
        id:"",
        username:"",
        email:"",
        password:"",
        github:"",
        linkedin:"",
        profile:""
    })
    const [existingImage, setExistingImage] = useState("")
    const [preview, setPreview] = useState("")
    const [updateStatus, setUpdateStatus]= useState(false)
    const handleUpdate = async(e)=>{
        e.preventDefault()
        const {username,email,password,github, linkedin,profile} = userDetails
        if(!github || !linkedin){
            toast.info('Please fill the form completely')
        }
        else{
            const reqBody = new FormData()

            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",preview):reqBody.append("profile",existingImage)

            const token = sessionStorage.getItem("token")
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    //for token based authorization we shold use Bearer key which is followed by single space and then token
                    "Authorization":`Bearer ${token}`        
                }
                const result = await updateProfileApi(reqBody,reqHeader)
                if(result.status == 200)
                    {
                        setUpdateStatus(!updateStatus)
                        toast.success('Profile Updated Successfully')
                        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    }
                    else{
                        toast.error('Something went wrong')
                        console.log(result);
                    }
            }
            else{
                const reqHeader ={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
                const result = await updateProfileApi(reqBody,reqHeader)
                if(result.status == 200)
                    {
                        setUpdateStatus(!updateStatus)
                        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                        toast.success('Profile Updated Successfully')
                    }
                    else{
                        toast.error('Something went wrong')
                        console.log(result);
                    }
            }
        }
    }
    useEffect(()=>{
        if(sessionStorage.getItem("existingUser")){
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDeatils({...userDetails, username:user.username, email:user.mailId,password:user.password,github:user.github,linkedin:user.linkedIn})
            setExistingImage(user.profile)
            console.log(existingImage);
        }
    },[updateStatus])

    useEffect(()=>{
        if(userDetails.profile){
            setPreview(URL.createObjectURL(userDetails.profile))
            console.log(userDetails.profile);
        }
        else{
            setPreview("")
        }

    },[userDetails.profile])
  return (
    <>
    <div className='my-5 mx-4   shadow p-4 rounded' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
       <div className='d-flex justify-content-between'>
            <h3 className="mt-3">
                Profile
            </h3>
<div className='mt-3'>
                <button type='button' onClick={() => setOpen(!open)} className='btn btn-outline-info'> <FontAwesomeIcon icon={faAngleDown} /></button>
    
</div>       
        </div>
       <Collapse in={open}>
            <div>
                <div className='mt-3 d-flex justify-content-center align-items-center flex-column'>
                    <label htmlFor='image1'>
                        <input id='image1' type="file" onChange={(e)=>setUserDeatils({...userDetails,profile:e.target.files[0]})}   style={{display:'none'}} />
                       { existingImage == ""? 
                       <img src={preview?preview:"https://cdn-icons-png.freepik.com/512/219/219986.png"} alt="no image" style={{borderRadius:'50%', width:'200px', height:'200px'}}/>
                       :
                       <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`} style={{borderRadius:'50%', width:'200px', height:'200px'}}/>
                       }
                        </label>
                    <div className='mb-3 mt-3 w-100'>
                        <input type="text" placeholder='GitHub' value={userDetails.github} onChange={(e)=>setUserDeatils({...userDetails,github:e.target.value})} name="" id="" className='form-control' />
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" placeholder='LinkedInn' value={userDetails.linkedin} onChange={(e)=>setUserDeatils({...userDetails,linkedin:e.target.value})} name="" id="" className='form-control' />
                    </div>
                    <div className='mb-3 w-100'>
                        <button onClick={handleUpdate} className='btn btn-success w-100'>Update</button>
                    </div>
                </div>
            </div>
       </Collapse>



    </div>
    <ToastContainer theme='colored'  position='top-center' autoClose={2000} />

    </>
  )
}

export default Profile
