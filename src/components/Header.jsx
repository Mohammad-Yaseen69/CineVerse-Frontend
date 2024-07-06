import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Admin from "../assets/admin.png"
import { logoutUser } from "../store/userslice"
import { useNavigate } from "react-router-dom"
import { Img } from "./"
import { MdMovie } from 'react-icons/md';
import { FaCompass, FaSignInAlt, FaUserPlus, } from 'react-icons/fa';
import { useState } from "react"




const btnClass = `w-[130px] max-sm:w-[80px] bg-black h-[45px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]`

const Header = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const [toggle, setToggle] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  }

  return (
    <div
      className={`w-full absolute top-0 left-0 py-2 bg-black bg-opacity-25 backdrop-blur-sm px-3 xs:px-5 
        ${location.pathname.includes("admin") && "hidden"}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center xs:space-x-2">
            <MdMovie className="size-10 xs:size-14" color="white" />
            <p className="font-montserrat text-white font-semibold">CineVerse</p>
          </Link>
        </div>

        <div>

        </div>
        <div className="flex items-center">
          {user.loading ? (
            <div className="loader"></div>
          ) : (
            <>
              {user.isLoggedIn ? (
                <div className="flex items-center gap-3">
                  {user.user?.isAdmin ? <img src={Admin} onClick={() => navigate("/admin")} className="size-11  cursor-pointer" alt="" /> : null}
                  <button onClick={() => navigate("/explore")} className="Btn BtnGreen flex items-center space-x-2">
                    <div className="sign">
                      <FaCompass size={37} color="white" />
                    </div>
                    <div className="text">Explore</div>
                  </button>
                  
                  <button onClick={handleLogout} className="Btn flex items-center space-x-2">
                    <div className="sign">
                      <svg viewBox="0 0 512 512" className="h-6 w-6">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div className="text">Logout</div>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 items-center xs:gap-3">
                  <button onClick={() => navigate("/explore")} className="Btn BtnGreen flex items-center space-x-2">
                    <div className="sign">
                      <FaCompass size={37} color="white" />
                    </div>
                    <div className="text">Explore</div>
                  </button>

                  <button onClick={() => navigate("/login")} className="Btn BtnBlue flex items-center space-x-2">
                    <div className="sign">
                      <FaSignInAlt size={37} color="white" />
                    </div>
                    <div className="text">Login</div>
                  </button>

                  <button onClick={() => navigate("/register")} className="Btn BtnBlue flex items-center space-x-2">
                    <div className="sign">
                      <FaUserPlus size={37} color="white" />
                    </div>
                    <div className="text">Register</div>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header