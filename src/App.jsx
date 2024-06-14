import { Outlet } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import {Header} from './components'

function App() {
  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  )
}

export default App
