import { useDispatch, useSelector } from "react-redux"
import { searchMedia } from "../store/mediaSlice"
import { useEffect, useState } from "react"
import { Img, MediaListSlider, SearchBox } from "../components"
import axios from "axios"
import { getAllGenre } from '../store/genreSlice'
import { useNavigate } from "react-router-dom"



const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [topRatedSeries, setTopRatedSeries] = useState([])
  const [query, setQuery] = useState("")
  
  // Here We are using Movie Db api for better quality images
  const [randomImgPath, setPath] = useState("")

  useEffect(() => {
    const fetchMedia = async () => {
      const response = await dispatch(searchMedia({
        sortBy: "rating",
        sortType: "desc",
        type: "movie"
      }))

      const seriesResponse = await dispatch(searchMedia({
        sortBy: "rating",
        sortType: "desc",
        type: "series"
      }))

      setTopRatedSeries(seriesResponse?.payload?.data?.docs)
      setTopRatedMovies(response?.payload?.data?.docs)
    };

    const movieImgPath = async () => {
      const response = await axios.get(`${import.meta.env.VITE_MOVIEDB_BASE_URL}trending/all/week?api_key=${import.meta.env.VITE_MOVIEDB_API}`)


      let randomIndex = Math.floor(Math.random() * response?.data?.results?.length);

      setPath("http://image.tmdb.org/t/p/original" + response?.data?.results[randomIndex]?.backdrop_path)
    }

    movieImgPath();
    fetchMedia();
  }, [])



  const handleQuery = () => {
    if (query) {
      navigate(`/search/${query}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuery();
    }
  }


  return (
    <div className=" w-full min-h-screen">
      <div className="relative">
        <div className="backdrop-img ">
          <Img src={randomImgPath} />
        </div>


        <div className="opacity-layer -z-30"></div>
        <div className="flex w-full h-[80vh] xs:h-screen flex-col  justify-center items-center">
          <h1 className="text-white font-extrabold text-4xl xs:text-5xl sm:text-7xl font-monstserrat">The Cine Verse</h1>
          <p className="mt-4 mb-10 text-gray-200 font-bold text-center text-sm sm:text-md">Explore Cinematic Worlds: Movies, Series, and Anime at Your Fingertips</p>
          <SearchBox query={query} setQuery={setQuery} handleQuery={handleQuery} handleKeyPress={handleKeyPress} />
        </div>
      </div>
      <div className="w-full">
        <MediaListSlider mediaObj={topRatedMovies} name="Top Rated Movies" />
        <MediaListSlider mediaObj={topRatedSeries} name="Top Rated Tv Series" />
      </div>
    </div>

  )
}

export default Home