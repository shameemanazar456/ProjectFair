import { serverUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"


//register
export const registerAPI = async (reqBody)=>{
    return await commonAPI('POST', `${serverUrl}/user/register`, reqBody,"")
}

//login

export const loginApi = async(reqBody)=>{
    return await commonAPI('POST',`${serverUrl}/user/login`,reqBody,"")
}

//addProject
export const addProjectApi = async(reqbody,reqHeader)=>{
    return await commonAPI('POST',`${serverUrl}/projects`,reqbody, reqHeader)
}

//get Home Project
export const getHomeProjectApi = async()=>{
    return await commonAPI('GET',`${serverUrl}/home-project`,"", "")
}


//query parameter = path?key = value

//get all projects
export const allProjectApi = async(searchKey)=>{
    return await commonAPI('GET', `${serverUrl}/all-project?search=${searchKey}`,"","")
}

// get user Project

export const getUserProjectApi = async(reqHeader)=>{
    return await commonAPI('GET',`${serverUrl}/user/all-project`,"",reqHeader)
}

//dlete a user project
export const deleteAProjectApi = async (id,reqHeader)=>{
    return await commonAPI('DELETE', `${serverUrl}/delete-project/${id}`,{},reqHeader)
}

//update project
export const updateProjectApi = async(id, reqBody, reqHeader)=>{
    return await commonAPI('PUT',`${serverUrl}/update-project/${id}`,reqBody,reqHeader)
}

//update profile

export const updateProfileApi=async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${serverUrl}/update-profile`,reqBody,reqHeader)
}