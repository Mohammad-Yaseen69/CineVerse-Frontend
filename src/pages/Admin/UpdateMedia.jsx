import { FormStages } from "../../components"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { editMedia, getMedia } from "../../store/mediaSlice"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


const UpdateMovies = () => {
  const { register, setValue, handleSubmit } = useForm()
  const { mediaId } = useParams()
  const genres = useSelector(state => state.genres.genres)
  const [stage, setStage] = useState(1)
  const [date, setDate] = useState(1970)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMedia({ id: mediaId })).then((res) => {
      console.log(res.payload)
    })
  
  }, [])

  return (
    <div>UpdateMovies</div>
  )
}

export default UpdateMovies