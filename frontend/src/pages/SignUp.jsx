import InputBox from '../components/InputBox'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Button from '../components/Button'
import ButtonWarning from '../components/ButtonWarning'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate("")
  return (
    <div className='h-screen bg-slate-300 flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='bg-white rounded-lg w-80 text-center p-2 h-max px-4'>
            <Heading title="Sign Up"/>
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox onChange={(e)=>{setFirstName(e.target.value)}} label={"First Name"} placeholder={"John"}/>
            <InputBox onChange={(e)=>{setLastName(e.target.value)}} label={"Last Name"} placeholder={"Wick"}/>
            <InputBox onChange={(e)=>{setEmail(e.target.value)}} label={"Email"} placeholder={"example@gmail.com"}/>
            <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"*******"}/>
            <div className="pt-4">
            <Button 
            label={"Sign in"}
            onClick={async()=>{
                const response=await axios.post('http://localhost:3000/api/v1/users/signup',{
                    firstName,
                    lastName,
                    username:email,
                    password
                })
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard")
            }}
            />
            </div>
            <ButtonWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}

export default SignUp
