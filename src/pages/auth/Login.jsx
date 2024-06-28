import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { FormField, FormStructure } from "../../components"
import { loginUser } from "../../store/userslice"
import { useDispatch } from "react-redux"

const Login = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    const response = await dispatch(loginUser(data))

    if (response.type === "login/fulfilled") {
      navigate("/")
    }
  }


  return (
    <FormStructure onSubmit={handleSubmit(submit)} name="Login to your account">
      <FormField id="email" registerFunction={register} type="email" name="Email" placeholder="Enter Your Email" />

      <FormField id="password" registerFunction={register} type="password" name="Password" placeholder="Enter Your Password" />

      <p onClick={() => navigate("/forgot-password")} className="mt-3 text-white font-bold cursor-pointer ml-3">Forgot Password?</p>
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
        type="submit" className="bg-blue-600 px-12 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Login" />
    </FormStructure>
  )
}

export default Login