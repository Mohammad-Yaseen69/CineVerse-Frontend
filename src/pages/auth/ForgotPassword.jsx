import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { FormField, FormStructure } from "../../components"
import { motion } from "framer-motion"
import { forgotPassword } from "../../store/userslice"
import { useNavigate } from "react-router-dom"


const ForgotPassword = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const submit = async (data) => {
    if (data) {
      const response = await dispatch(forgotPassword(data))
      if (response.type === "forgotPassword/fulfilled" && response.payload?.success) {
        navigate("/otp-verify")
      }
    }
  }

  return (
    <FormStructure onSubmit={handleSubmit(submit)} name={"Forgot Password"}>
      <FormField id="email" registerFunction={register} type="email" name="Email" placeholder="Enter Your Email" />
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
        type="submit" className="bg-blue-600 px-12 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Send Otp" />
    </FormStructure>
  )
}

export default ForgotPassword