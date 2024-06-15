import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Login, Register, Chat, Home, NotFound,ForgotPassword,OTPVerify,ResetPassword ,Verification} from "./pages"
import { Provider } from 'react-redux'
import store from "./store/store.js"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify" element={<OTPVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/users/:userId/verify/:token" element={<Verification />}/>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
