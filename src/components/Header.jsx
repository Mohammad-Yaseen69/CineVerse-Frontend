import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { logoutUser } from "../store/userslice"
import { useNavigate } from "react-router-dom"


const btnClass = `w-[130px] max-sm:w-[80px] bg-black h-[45px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]`

const Header = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <div className="w-full  py-8 px-3 xs:px-5">
      <div className="flex justify-between">
        <div className="flex items-center max-xs:hidden  justify-center gap-1">
          <img
            src={Logo}
            alt="gpt-logo"
            className="size-14 rounded-xl"
          />
          <h1 className="text-white font-bold text-lg font-roboto"><span className="text-xl font-monstserrat">MERN</span>-GPT</h1>
        </div>

        <div className="flex items-center max-xs:justify-between max-xs:w-full justify-center">
          {user.loading ? <div className="loader"></div> :
          <>
          <Link to="/">
            <button className="xs:px-4 px-2 text-gray-100 font-bold text-xl xs:py-2 rounded-md">Home</button>
          </Link>
          { user.isLoggedIn ? (
                <button onClick={handleLogout} className="Btn flex items-center space-x-2">
                  <div className="sign">
                    <svg viewBox="0 0 512 512" className="h-6 w-6">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="text">Logout</div>
                </button>
              ) : (
                <div className="flex gap-2 xs:gap-3">
                  <Link to="/login">
                    <button className={btnClass}>Login</button>
                  </Link>

                  <Link to="register">
                    <button className={btnClass}>Register</button>
                  </Link>
                </div>
              )}
          </>}


        </div>
      </div>
    </div>
  )
}

export default Header