import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({component}) => {

   const token = useSelector((state)=>state.authUser.isLoggedIn)
   const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/login")
    }
  },[])

  return (
    <>
      {component}
    </>
  )
}

export default ProtectedRoute
