import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Header } from './components'
import { useDispatch, useSelector } from "react-redux"
import { getUser, refreshAccessToken } from "./store/userslice"
import {getAllGenre} from './store/genreSlice'
import { useEffect } from "react"


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const { isLoggedIn, expiresIn } = user

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllGenre())
  }, [])

  useEffect(() => {
    if (isLoggedIn && expiresIn) {
      const expireTime = expiresIn * 1000 - 60000 // 1 minute before expiration

      if (expireTime < Date.now()) {
        dispatch(refreshAccessToken())
      }
    }
  }, [isLoggedIn, expiresIn])

  return (
    <div className="w-full relative min-h-screen ">
      <Header />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
