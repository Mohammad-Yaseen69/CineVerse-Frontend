import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Header } from './components'
import { useDispatch } from "react-redux"
import { getUser } from "./store/userslice"
import { useEffect } from "react"

function App() {
 
  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <Header />
      <Outlet />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
