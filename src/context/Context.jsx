import React, { createContext, useState } from 'react'

//1.create context using method - createContext()
export const AddProjectREsponseStatusContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthorizedContext = createContext()
//3. destructure 'children' in the function to access the context by every component
function Context({children}) {
    //2. create a state in the component
    const [addResponse, setAddResponse]= useState({})
    const [editResponce, setEditResponse] = useState({})
    const [isAuthorized, setIsAuthorized] = useState(true)
    return (
    //4. provide created context api (AddProjectREsponseStatusContext).Provider as the tag - to provide the context to all component 
    //5) value attribute is used to share data, here addresponse and setaddresponse 
    <AddProjectREsponseStatusContext.Provider value={{addResponse,setAddResponse}}>
     <editProjectResponseContext.Provider value={{editResponce,setEditResponse}}> 
     <isAuthorizedContext.Provider value={{isAuthorized,setIsAuthorized}}> {children}</isAuthorizedContext.Provider>
      </editProjectResponseContext.Provider>
    </AddProjectREsponseStatusContext.Provider>
  )
}

//6. in main.jsx wrap app.jsx in Context(component name of context) tag

export default Context
