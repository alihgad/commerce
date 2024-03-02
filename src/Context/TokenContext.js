import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'


export const TokenContext = createContext()

export default function TokenContextProvider(props) {
    const [token , setToken ] = useState(null)
    const [id , setId ] = useState(null)
    const [name , setName ] = useState(null)

useEffect((function(){
  if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
   getId()

  }
}),[])


 function getId(){
  if(token){
    const decoded =  jwtDecode(token);
    console.log(decoded);
    if(!id){
      setId(decoded.id)
      return decoded.id
    }
  
    if(!name){
      setName(decoded.name)
    }
  }
}









  return (
    <TokenContext.Provider value={{token,setToken,id,name,getId}} >

      {props.children}
    </TokenContext.Provider>
  )
}

