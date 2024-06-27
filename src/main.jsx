import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import {
  Login,
  Register,
  Chat, Home,
  NotFound,
  ForgotPassword,
  OTPVerify,
  ResetPassword,
  Verification,
  Admin,
  CreateGenres,
  CreateMovie,
  Reviews,
  UpdateMovies,
} from "./pages"
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
      <Route path="/users/:userId/verify/:token" element={<Verification />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/genres/create" element={<CreateGenres />} />
      <Route path="/admin/reviews" element={<Reviews />} />
      <Route path="/admin/movies/create" element={<CreateMovie />} />
      <Route path="/admin/movies/:movieId/update" element={<UpdateMovies />} />

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
