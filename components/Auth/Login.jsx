"use client"
import React from 'react'
import Template from './Template'
import Loading from '../common/Loading';
import { useSelector } from 'react-redux';
const Login = () => {
  const { loading } = useSelector((state) => state.auth)
  return (
    loading ? (
      <div><Loading/></div>
    ) : (
      <Template
        title={"Welcome Back!"}
        desc1={"Log in to continue exploring consultants, booking sessions, and growing with expert advice."}
        formType="login"
      />
    )
  )
}

export default Login