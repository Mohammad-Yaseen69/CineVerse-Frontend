import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMedia } from "../store/mediaSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Img } from "../components"
import GenresList from '../components/Media/GenresList'
import RatingCircle from '../components/Media/RatingCircle'
import { dislikeReview, addReview, deleteReview, likeReview } from "../store/reviewSlice"
import { FiTrash2 } from 'react-icons/fi'

const Media = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.media.loading)
  const [data, setData] = useState([])
  const user = useSelector(state => state.user.user)
  const [userReview, setUserReview] = useState("")
  const [reviews, setReviews] = useState([])

  const { mediaId } = useParams()

  useEffect(() => {
    dispatch(getMedia({ id: mediaId })).then((res) => {
      setData(res.payload?.data)
      setReviews(res?.payload?.data?.reviews)
    })
  }, [])


  const sortedRoles = data?.cast?.sort((a, b) => {
    const rolePriority = {
      writer: 1,
      director: 2
    };

    const priorityA = rolePriority[a.roleType] || 3; // Default priority for other roles
    const priorityB = rolePriority[b.roleType] || 3;

    return priorityA - priorityB;
  });



  const handleLike = (reviewId) => {
    dispatch(likeReview({ id: reviewId }))
    setData(prevData => ({
      ...prevData,
      reviews: prevData.reviews.map(review =>
        review._id === reviewId ? { ...review, likes: review.likes + 1 } : review
      )
    }))
  }

  const handleDislike = (reviewId) => {
    dispatch(dislikeReview({ id: reviewId }))
    setData(prevData => ({
      ...prevData,
      reviews: prevData.reviews.map(review =>
        review._id === reviewId ? { ...review, dislikes: review.dislikes + 1 } : review
      )
    }))
  }

  const addReviewHandler = () => {
    console.log(mediaId)
    if (userReview) {
      dispatch(addReview({ review: userReview, mediaId })).then(res => {
        const newReview = {
          ...res.payload?.data?.review,
          user: {
            userName: user?.userName
          }
        }
        setReviews(prevReviews => [...prevReviews, newReview])
        setUserReview("")
      })
    }
  }

  console.log(reviews)
  const handleDelete = (reviewId) => {
    dispatch(deleteReview({ reviewId })).then(res => {
      setReviews(reviews.filter(review => review._id !== reviewId))
    })
  }

  return (
    <>
      {
        loading ? <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center'><div className='loader2'></div></div> : (
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

            <div className='w-full mt-32'>
              <h1 className='text-white font-extrabold font-monstserrat text-lg xs:text-2xl sm:text-3xl xl:text-6xl'>Reviews</h1>
              <div>
                {user === null ?
                  <h1 className='text-gray-400 font-bold  text-sm xs:text-lg pt-8 xl:text-2xl'>Please Login to write review</h1> :
                  <div className=''>
                    <h1 className='text-gray-400 font-bold  text-sm xs:text-lg pt-8 xl:text-2xl'>Write your review: </h1>
                    <div className='pt-5 '>
                      <textarea value={userReview} onChange={(e) => setUserReview(e.target.value)} className='w-full bg-zinc-800 px-3 h-28 py-3 text-white border-none outline-none resize-none rounded-lg'></textarea>
                      <button onClick={addReviewHandler} className='rounded-md mt-3 bg-blue-600 text-white font-bold font-monstserrat px-3 py-1'>Submit</button>
                    </div>
                  </div>
                }
              </div>
              <div className='flex flex-col gap-3 mt-10'>
                {reviews?.map((review, index) => (
                  <div key={index} className='bg-[#2c2c2c] flex flex-col p-4 rounded-lg'>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-white font-bold'>{review.user?.userName}</h2>
                      {review.user.userName == user?.userName && <button className='text-red-600 font-bold' onClick={() => handleDelete(review._id)}><FiTrash2 color='red' /></button>}
                    </div>
                    <div className='flex items-center justify-between pt-3'>
                      <p className='text-gray-300 mt-2'>{review.review}</p>
                      <div className='flex justify-end gap-3 mt-2'>
                        <span onClick={() => handleLike(review._id)} className='text-gray-400 cursor-pointer'>👍 {review.likes || 0}</span>
                        <span onClick={() => handleDislike(review._id)} className='text-gray-400 cursor-pointer'>👎 {review.dislikes || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Media
