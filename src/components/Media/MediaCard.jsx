import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../'
import { useSelector } from 'react-redux'
import RatingCircle from "./RatingCircle"
import GenresList from './GenresList'

const MediaCard = ({
  name,
  releaseYear,
  img,
  genres,
  rating,
  id
}) => {
  genres = genres.slice(0, 2)

  return (
    <div className='mb-8 cursor-pointer rounded-xl w-[125px] sm:w-[160px] md:w-[220px]'>
      <div className='posterBlock'>
        <Img src={img} />
        <RatingCircle rating={rating} className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] z-20 relative top-5 sm:top-8 flex-shrink-0 bg-white" />
        <div className='flex flex-wrap items-end justify-end  z-20 max-md:hidden gap-2'>
          {genres?.map((genre, index) => (
            <GenresList key={index} genre={genre} />
          ))}
        </div>
      </div>
      <div className='text-start'>
        <h1 className='text-white font-bold font-roboto text-lg sm:text-xl md:text-2xl'>{name}</h1>
        <h2 className='text-gray-300 font-semibold font-monstserrat text-sm sm:text-lg'>{releaseYear}</h2>
      </div>
    </div>
  )
}

export default MediaCard