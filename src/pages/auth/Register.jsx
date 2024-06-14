import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { set, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { FormField } from "../../components"
import { createAccount, loginUser } from "../../store/userslice"
import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react'

const Register = () => {
  const { register, handleSubmit } = useForm()
  const [submiting, setSubmiting] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    setSubmiting(true)
    if(data){

      const response = await dispatch(createAccount(data))
  
      if (response.type === "register/fulfilled") {
        const res = await dispatch(loginUser({ email: data.email, password: data.password }))
        if (res.type === "login/fulfilled"){
          navigate("/");
        }
        else{
          navigate("/login");
        }
      }


      setSubmiting(false)
    }
  }

  return (
    <div className='w-full h-[80vh] flex'>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-monstserrat text-white font-extrabold text-5xl mb-10">Create Account</h1>
        <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col w-[60%] gap-3 items-start mx-auto p-6">
          <FormField id="name" registerFunction={register} type="text" name="Name" placeholder="Enter Your Name" />

          <FormField id="email" registerFunction={register} type="email" name="Email" placeholder="Enter Your Email" />


          <FormField id="password" registerFunction={register} type="password" name="Password" placeholder="Enter Your Password" />
          <motion.input
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
            type="submit" disabled={submiting} className="bg-blue-600 px-7 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Register" />
        </form>
      </div>
    </div>
  )
}

export default Register