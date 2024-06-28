import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { set, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { FormField, FormStructure } from "../../components"
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
    if (data) {

      const response = await dispatch(createAccount(data))

      if (response.type === "register/fulfilled") {
        const res = await dispatch(loginUser({ email: data.email, password: data.password }))
        if (res.type === "login/fulfilled") {
          navigate("/");
        }
        else {
          navigate("/login");
        }
      }


      setSubmiting(false)
    }
  }

  return (
    <FormStructure name="Create Account" onSubmit={handleSubmit(submit)}>
      <FormField id="userName" registerFunction={register} type="text" name="userName" placeholder="Enter Your User Name" />

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
    </FormStructure>
  )
}

export default Register