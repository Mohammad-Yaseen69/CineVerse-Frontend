import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { FormField, FormStructure } from "../../components"
import { motion } from "framer-motion"
import { verifyOtp } from "../../store/userslice"
import { useNavigate } from 'react-router-dom'

const OTPVerify = () => {
  const { handleSubmit, register } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    if (data) {
      const response = await dispatch(verifyOtp(data))

      if (response.type === "verifyOtp/fulfilled" && response?.payload?.message === "OTP verified successfully") {
        navigate("/reset-password")
      }
    }
  }
  return (
    <FormStructure onSubmit={handleSubmit(submit)} name={"Verify Your OTP"}>
      <FormField id="otp" registerFunction={register} type="number" name="otp" placeholder="Enter Your OTP" />
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
        type="submit" className="bg-blue-600 px-12 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Verify" />
    </FormStructure>
  )
}

export default OTPVerify