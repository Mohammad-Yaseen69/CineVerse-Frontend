import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { FormField } from "../../components"

const Login = () => {
  const { register, handleSubmit } = useForm()

  const submit = (data) => {
    console.log(data)
  }


  return (
     <div className='w-full h-[80vh] flex'>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="font-monstserrat text-white font-extrabold text-5xl mb-10">Login to your account</h1>
        <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col w-[50%] gap-3 items-start mx-auto p-6">
          <FormField id="email" registerFunction={register} type="email" name="Email" placeholder="Enter Your Email" />

          <FormField id="password" registerFunction={register} type="password" name="Password" placeholder="Enter Your Password" />

          <p className="mt-3 text-white font-bold cursor-pointer ml-3">Forgot Password?</p>
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
        </form>
      </div>

    </div>
  )
}

export default Login