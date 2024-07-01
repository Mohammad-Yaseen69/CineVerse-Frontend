import { useState, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { FormStages } from "../../components"
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addMedia } from "../../store/mediaSlice"
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa'


const CreateMedia = () => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      cast: [{ name: "", roleType: "" }]
    }
  })
  const genres = useSelector(state => state.genres.genres)
  const [stage, setStage] = useState(1)
  const [date, setDate] = useState(1970)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch()

  const submit = async (data) => {

    for (const key in data) {
      if (!data[key]) {
        toast.error(`Please Provide ${key}`);
        return; // Exit the function if any field is missing
      }
    }
    if (data.img.length === 0) {
      toast.error(`Please Provide an img`);
      return; // Exit the function if the image is not provided
    }
    if (selectedGenres.length === 0) {
      toast.error(`Please Select Genres`);
      return; // Exit the function if genres are not selected
    }

    let dater = new Date(date);
    data.language = data.language.replace(" ", "").trim().split(",");
    data.releaseYear = dater.getFullYear();
    data.genres = selectedGenres;

    const formData = new FormData();
    formData.append("img", data.img[0]); // Append the file
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("releaseYear", data.releaseYear);
    formData.append("duration", data.duration);
    formData.append("language", JSON.stringify(data.language));
    formData.append("rating", data.rating);
    formData.append("genres", JSON.stringify(data.genres));
    formData.append("cast", JSON.stringify(data.cast));


    setDisable(true)

    data.name = ""
    data.description = ""
    data.type = ""
    setDate("")
    setSelectedGenres([])
    data.language = ""
    data.rating = ""
    data.cast = [{ name: "", roleType: "" }]
    data.duration = ""
    data.img = ""


    // Log the FormData content
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const add = await dispatch(addMedia(formData));

    setDisable(false)

    console.log("Response from dispatch:", add.payload);
  };


  useEffect(() => {
    setValue("cast", [{ name: "", roleType: "" }])
  }, [setValue])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast"
  })

  const handleGenreChange = (selected) => {
    setSelectedGenres(selected.map(item => item.value))
  }


  return (
    <div className='w-full h-screen flex flex-col justify-start pt-12 items-center'>
      <Link to="/admin" className="absolute left-2 top-6 xs:left-6 font-bold text-white font-roboto"><FaArrowLeft color="white" size={25}/> </Link>
      <h1 className='text-white text-4xl xs:text-5xl font-bold font-monstserrat'>Create Media</h1>
      <form onSubmit={handleSubmit(submit)} className="mt-10 flex items-center justify-center w-full" action="">
        <FormStages
          append={append}
          date={date}
          disable={disable}
          fields={fields}
          genres={genres}
          handleGenreChange={handleGenreChange}
          register={register}
          remove={remove}
          selectedGenres={selectedGenres}
          setDate={setDate}
          setSelectedGenres={setSelectedGenres}
          setStage={setStage}
          stage={stage}
        />
      </form>
    </div>
  )
}

export default CreateMedia
