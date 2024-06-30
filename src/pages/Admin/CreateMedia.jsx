import { useState, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { MediaFormField, GenreSelection } from "../../components"
import { FaArrowLeft } from 'react-icons/fa';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addMedia } from "../../store/mediaSlice"


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
    <div className='w-full h-screen flex flex-col justify-start pt-6 items-center'>
      <h1 className='text-white text-5xl text-bold font-monstserrat'>Create Media</h1>
      <form onSubmit={handleSubmit(submit)} className="mt-10 flex items-center justify-center w-full" action="">
        {stage == 1 && (
          <div className="flex w-1/2 flex-col gap-5">
            <MediaFormField label="Name:" width="w-full" name="name" register={register} required type="text" />
            <MediaFormField label="Description:" width="w-full" className={"h-40"} name="description" register={register} isTextArea required />
            <MediaFormField label="Cover Image(Upload Full sized Image)" register={register} name="img" type={"file"} className="bg-zinc-900 px-0 " />
            <div className="flex justify-between  items-center">
              <button type="button" onClick={() => setStage(stage - 1)} disabled={stage == 1 ? true : false} className={`rounded-full ${stage !== 1 ? "bg-[#ff0000af] cursor-pointer" : "bg-gray-800 cursor-auto"} w-12 h-12 flex items-center justify-center`} p-2><FaArrowLeft color="white" /></button>
              <button type="button" onClick={() => setStage(stage + 1)} className="bg-green-600 rounded-md px-5 py-2 text-white font-bold">Next</button>
            </div>
          </div>
        )}

        {stage == 2 && (
          <div className="flex w-1/2 flex-col gap-5">
            <div className="flex gap-3 items-center">
              <MediaFormField label="Type:" width="w-1/2" name="type" register={register} required select={[
                { label: "Movie", value: "movie" },
                { label: "Series", value: "series" }
              ]} />
              <MediaFormField
                width="w-1/2"
                isDatePicker
                label="Release Year:"
                name="releaseYear"
                dateValue={date}
                setDateValue={setDate}
              />
            </div>
            <MediaFormField label="Duration:" width="w-full" name="duration" required type="text" register={register} placeholder="Example : 2h 12m" />
            <MediaFormField label="Languages (Seprated By Comma):" width="w-full" name="language" required type="text" placeholder="Example : English, Urdu, Japanese" register={register} />
            <MediaFormField label="Rating:" max={10} step="any" name="rating" required register={register} type="number" />
            <div className="flex justify-between  items-center">
              <button type="button" onClick={() => setStage(stage - 1)} disabled={stage == 1 ? true : false} className={`rounded-full ${stage !== 1 ? "bg-[#ff0000af] cursor-pointer" : "bg-gray-800 cursor-auto"} w-12 h-12 flex items-center justify-center`} p-2><FaArrowLeft color="white" /></button>
              <button type="button" onClick={() => setStage(stage + 1)} className="bg-green-600 rounded-md px-5 py-2 text-white font-bold">Next</button>
            </div>
          </div>
        )}

        {stage == 3 && (
          <div className="flex w-1/2 flex-col gap-5">
            <GenreSelection genres={genres} handleGenreChange={handleGenreChange} />

            <div className="flex flex-col w-full">
              <label htmlFor="" className="font-bold text-gray-300 bg-2 text-lg">Cast:</label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-6">
                  <MediaFormField width="w-[40%]" name={`cast[${index}].name`} register={register} required type="text" placeholder="Enter Name" />
                  <MediaFormField width="w-[40%]" name={`cast[${index}].roleType`} register={register} required select={[
                    { label: "Select Role Type", value: "" },
                    { label: "Actor", value: "cast" },
                    { label: "Voice Actor", value: "voiceActor" },
                    { label: "Writer", value: "writer" },
                    { label: "Director", value: "director" },
                  ]} />
                  <button type="button" onClick={() => remove(index)} disabled={index === 0} className={`${index === 0 ? "text-gray-600" : "text-red-700"}  font-bold`}>Remove</button>
                  <button type="button" onClick={() => append({ name: "", roleType: "" })} className="text-green-600 font-bold">Add</button>
                </div>
              ))}

            </div>

            <div className="flex justify-between  items-center">
              <button type="button" onClick={() => setStage(stage - 1)} disabled={stage == 1 ? true : false} className={`rounded-full ${stage !== 1 ? "bg-[#ff0000af] cursor-pointer" : "bg-gray-800 cursor-auto"} w-12 h-12 flex items-center justify-center`} p-2><FaArrowLeft color="white" /></button>
              <input type="submit" className="bg-green-600 rounded-md cursor-pointer px-5 py-2 text-white font-bold" />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateMedia
