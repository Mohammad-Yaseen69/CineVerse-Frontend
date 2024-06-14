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
     <div className='w-full h-screen flex'>
      <div className="w-[70%] h-full flex flex-col justify-center items-center">
        <h1 className="font-monstserrat text-white font-extrabold text-5xl mb-10">Sign In</h1>
        <form onSubmit={handleSubmit(submit)} action="" className="flex flex-col w-[70%] gap-3 items-start mx-auto p-6">
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
            type="submit" className="bg-blue-600 px-12 py-3  text-white font-semibold self-center rounded-full cursor-pointer" value="Login" />
        </form>
      </div>
      <div className="w-[30%] flex flex-col items-center justify-center bg-[#4B4E6D] h-full">
        <h1 className="font-roboto text-white font-extrabold text-5xl">New Here?</h1>
        <Link
          to="/register"
        >
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              ease: "easeOut"
            }}
            className="bg-blue-600 px-6 mt-5 py-3 text-lg text-white font-semibold self-center rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
          >

            Create an account

          </motion.button>
        </Link>
      </div>
    </div>
  )
}

export default Login