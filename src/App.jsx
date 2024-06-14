import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <Outlet />
    </div>
  )
}

export default App
