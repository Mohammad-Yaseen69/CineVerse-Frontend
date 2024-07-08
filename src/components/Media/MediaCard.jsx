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
  id,
  isSearchCard = false,
}) => {
  if (genres) {
    genres = genres.slice(0, 2)
  }

  if(name?.length >= 15){
    name = name.slice(0,15) + '...'
  }

  return (
    <div className={`mb-8 cursor-pointer rounded-xl ${isSearchCard ? "w-[110px] xs:w-[160px] sm:w-[160px] md:w-[220px]" : "w-[125px] sm:w-[160px] md:w-[225px]"} `}>
      <div className='posterBlock relative mb-[15px] sm:mb-[25px]'>
        <Link to={`/media/${id}`}>
          <Img src={img} />
        </Link>
        {rating && <RatingCircle rating={rating} className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] z-20 absolute -bottom-3 left-2 sm:-bottom-5 flex-shrink-0 bg-white" />}
        {genres && <div className='flex flex-wrap items-end justify-end  z-20 max-md:hidden gap-2'>
          {genres?.map((genre, index) => (
            <GenresList key={index} genre={genre} />
          ))}
        </div>}
      </div>
      <div className='text-start'>
        <h1 className='text-white font-bold font-roboto text-sm sm:text-xl md:text-2xl'>{name}</h1>
        <h2 className='text-gray-300 font-semibold font-monstserrat text-sm sm:text-lg'>{releaseYear}</h2>
      </div>
    </div>
  )
}

export default MediaCard