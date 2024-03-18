import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'


export const TokenContext = createContext()

export default function TokenContextProvider(props) {
    const [token , setToken ] = useState(null)
    const [id , setId ] = useState(null)
    const [name , setName ] = useState(null)

    function build(){
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
       getId()
    
      }
    }

    
useEffect((function(){
  build()
  
}),[])


 function getId(){
  if(token){
    const decoded =  jwtDecode(token);
    console.log(decoded);
    if(!id){
      setId(decoded.id)
      console.log(id);
      setName(decoded.name)
      console.log(decoded.name);
      console.log(name);
      return decoded.id
    }
  
    if(!name){
    }
  }
}








  return (
    <TokenContext.Provider value={{token,setToken,id,name,getId,build}} >

      {props.children}
    </TokenContext.Provider>
  )
}

