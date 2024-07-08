import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import {
  Login,
  Register,
  Home,
  NotFound,
  ForgotPassword,
  OTPVerify,
  ResetPassword,
  Verification,
  Admin,
  CreateGenres,
  Reviews,
  AdminRoutes,
  CreateMedia,
  UpdateMedia,
  ManageMedia,
  Media,
  Search,
  Explore
} from "./pages"
import { Provider } from 'react-redux'
import store from "./store/store.js"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify" element={<OTPVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/users/:userId/verify/:token" element={<Verification />} />\
      <Route path="/media/:mediaId" element={<Media />} />
      <Route path='/search/:query' element={<Search />} />
      <Route path='/explore' element={<Explore />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoutes />}>
        <Route index element={<Admin />} />
        <Route path="genres/create" element={<CreateGenres />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="media/create" element={<CreateMedia />} />
        <Route path="media/:mediaId/update" element={<UpdateMedia />} />
        <Route path='media/manage' element={<ManageMedia />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
