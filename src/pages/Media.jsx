import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMedia } from "../store/mediaSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Img } from "../components"
import GenresList from '../components/Media/GenresList'
import RatingCircle from '../components/Media/RatingCircle'

const Media = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.media.loading)
  const [data, setData] = useState([])

  const { mediaId } = useParams()

  useEffect(() => {
    dispatch(getMedia({ id: mediaId })).then((res) => {
      setData(res.payload?.data)
    })
  }, [])


  console.log(data)

  const sortedRoles = data?.cast?.sort((a, b) => {
    const rolePriority = {
      writer: 1,
      director: 2
    };
  
    const priorityA = rolePriority[a.roleType] || 3; // Default priority for other roles
    const priorityB = rolePriority[b.roleType] || 3;
  
    return priorityA - priorityB;
  });
  return (
    <div className='relative pt-24 p-3 sm:px-8 md:px-14'>
      <div className='flex w-full gap-5 max-md:flex-col max-md:'>
        <div className='posterImgMediaPage max-md:self-center'>
          <Img
            src={data?.img?.publicUrl}
          />
        </div>

        <div className='max-md:pt-10'>
          <h1 className='text-white font-extrabold font-monstserrat text-4xl xl:text-6xl '>{data?.name} ({data?.releaseYear})</h1>
          <p className='text-gray-400 font-bold  text-sm xs:text-lg pt-8 xl:text-2xl'>{data?.description}</p>
          <div>
            <h1 className='text-white font-bold text-2xl pt-4'>Genres</h1>
            <div className='flex flex-wrap items-center  gap-3 pt-5'>
              {data?.genre?.map((genre) => (
                <GenresList key={genre._id} genre={genre} isDetailsPage={true} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='mt-14'>
        <div className='flex gap-y-6 max-md:flex-col justify-between'>
          <div className='flex flex-col gap-7 md:gap-11'>
            <div className='flex gap-4 items-center'>
              <h1 className='text-white font-extrabold font-monstserrat text-lg xs:text-2xl  sm:text-3xl xl:text-6xl '>Type: </h1>
              <p className='text-gray-400 font-bold text-lg xs:text-2xl sm:text-43l xl:text-6xl'>{data?.type === "movie" ? "Movie" : "Tv Series"}</p>
            </div>
            <div className='flex items-center gap-3 '>
              <h1 className='text-white font-extrabold font-monstserrat text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>Languages: </h1>
              <h1 className='text-gray-400 font-bold text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>{data?.language?.join(",")}</h1>
            </div>
            <div className='flex items-center gap-3 '>
              <h1 className='text-white font-extrabold font-monstserrat text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>Duration: </h1>
              <h1 className='text-gray-400 font-bold text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>{data?.duration?.replace(" ", "")}</h1>
            </div>
            <div className='flex items-center gap-3 '>
              <h1 className='text-white font-extrabold font-monstserrat text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>IMDB Rating: </h1>
              <div className='h-[45px] w-[45px] xs:h-[70px] xs:w-[70px] flex-shrink-0 '>
                <RatingCircle rating={data?.rating} />
              </div>
            </div>
          </div>


          <div className='w-full max-md:mt-8 md:w-1/2'>
            <h1 className='text-white font-extrabold font-monstserrat text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>Cast</h1>
            <div className='flex flex-col gap-3 mt-5'>
              {sortedRoles?.map((cast) => (
                <>
                  {cast.roleType == "director" && <p className='text-gray-200 xs:font-semibold  sm:text-lg'>{cast.name} (Director)</p>}
                  {cast.roleType == "writer" && <p className='text-gray-200 xs:font-semibold  sm:text-lg'>{cast.name} (Writer)</p>}
                  {cast.roleType != "writer" && cast.roleType != "director" && <p key={cast._id} className='text-gray-200 xs:font-semibold  sm:text-lg'>{cast.name} {cast.roleType == "voiceActor" && "(Voice Actor)"}</p>}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media