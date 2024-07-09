import { FaArrowLeft } from "react-icons/fa"
import MediaFormField from "./MediaFormField"
import GenreSelection from "./GenreSelection"
import FormStage from "./FormStage"
import Button from "./Button"

const FormStages = ({
  register,
  setStage,
  stage,
  setSelectedGenres,
  selectedGenres,
  setDate,
  date,
  defaultDateValue,
  genres,
  fields,
  remove,
  append,
  disable,
  handleGenreChange
}) => {
  return (
    <>
      <FormStage stage={stage} stageNumber={1}>
        <MediaFormField label="Name:" width="w-full" name="name" register={register} required type="text" />
        <MediaFormField label="Description:" width="w-full" className={"h-40"} name="description" register={register} isTextArea required />
        <MediaFormField label="Cover Image(Upload Full sized Image)" register={register} name="img" type={"file"} className="bg-zinc-900 px-0 " />
        <div className="flex justify-between  items-center">
          <Button setStage={setStage} stage={stage} type="back" />
          <Button setStage={setStage} stage={stage} type="next" />
        </div>
      </FormStage>

      <FormStage stage={stage} stageNumber={2}>
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
            defaultDateValue={defaultDateValue ? defaultDateValue : undefined}
            setDateValue={setDate}
          />
        </div>
        <MediaFormField label="Duration:" width="w-full" name="duration" required type="text" register={register} placeholder="Example : 2h 12m" />
        <MediaFormField label="Languages (Seprated By Comma):" width="w-full" name="language" required type="text" placeholder="Example : English, Urdu, Japanese" register={register} />
        <MediaFormField label="Rating:" max={10} step="any" name="rating" required register={register} type="number" />
        <div className="flex justify-between  items-center">
          <Button setStage={setStage} stage={stage} type="back" />
          <Button setStage={setStage} stage={stage} type="next" />
        </div>
      </FormStage>

      <FormStage stage={stage} stageNumber={3}>
        <GenreSelection genres={genres} handleGenreChange={handleGenreChange} selectedGenre={selectedGenres} />

        <div className="flex flex-col w-full">
          <label htmlFor="" className="font-bold text-gray-300 bg-2 text-lg">Cast:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 xs:gap-6">
              <MediaFormField width="w-1/2 xs:w-[40%]" name={`cast[${index}].name`} register={register} required type="text" placeholder="Enter Name" />
              <MediaFormField width="w-1/2 xs:w-[40%]" name={`cast[${index}].roleType`} register={register} required select={[
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
          <Button setStage={setStage} stage={stage} type="back" />
          <input type="submit" disabled={disable} className="bg-green-600 rounded-md cursor-pointer px-5 py-2 text-white font-bold" />
        </div>
      </FormStage>
    </>
  )
}

export default FormStages