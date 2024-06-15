import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { FormField } from "../../components"
import { motion } from "framer-motion"
import { resetPassword } from "../../store/userslice"

const ResetPassword = () => {
  const { handleSubmit, register } = useForm()
  const email = useSelector(state => state.user.userEmailForgotPassword)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    if (data) {
      const modifiedData = {
        ...data,
        email
      }
      const response = await dispatch(resetPassword(modifiedData))

      if (response.type === "resetPassword/fulfilled" && response.payload?.success) {
        navigate("/login")
      }
    }
  }
  return (
    <div className='w-full h-[80vh] flex'>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-monstserrat text-white font-extrabold text-5xl mb-10">Reset your password</h1>
        <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col w-[50%] gap-3 items-start mx-auto p-6">
          <FormField id="newPassword" registerFunction={register} type="password" name="newPassword" placeholder="Enter Your New password" />
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
            type="submit" className="bg-blue-600 px-12 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Submit" />
        </form>
      </div>

    </div>
  )
}

export default ResetPassword