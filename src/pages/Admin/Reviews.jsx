import { useEffect, useState } from 'react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { listReviews } from "../../store/reviewSlice"
import { useDispatch } from 'react-redux'
import { FiTrash2 } from 'react-icons/fi'

const Reviews = () => {
  const dispatch = useDispatch()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    dispatch(listReviews()).then((res) => {
      setReviews(res.payload?.data)
    })
  }, [])

  console.log(reviews)

  return (
    <div className='p-4 xs:p-7 sm:p-14 flex flex-col items-center'>
      <Link to="/admin" className="absolute left-2 top-6 xs:left-6 font-bold text-white font-roboto"><FaArrowLeft color="white" size={25} /> </Link>
      <h1 className="text-2xl xs:text-4xl font-bold  text-white my-7">Recent Reviews/Comments</h1>
      {reviews?.map((item, index) => (
        <div key={index} className="flex relative flex-col items-start p-2 xs:p-3 border border-zinc-700 bg-zinc-800 rounded w-full my-2">
          <div className='flex justify-between w-full'>
            <p className='text-sm text-gray-200 xs:font-semibold '>{item?.user?.userName}</p>
            <p className='text-sm text-gray-200 xs:font-semibold '>Review on {item?.media?.name}</p>
          </div>
          <div className='py-2 pt-3 flex justify-between w-full items-center'>
            <span className='font-bold text-white text-center font-monstserrat text-lg'>{item?.review} </span>
            <span className=''><FiTrash2 color='red' /></span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Reviews