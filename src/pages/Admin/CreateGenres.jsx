import { useSelector, useDispatch } from "react-redux"
import { addGenre, deleteGenre, getAllGenre } from "../../store/genreSlice"
import { FiTrash2 } from 'react-icons/fi';
import { useState } from "react";

const CreateGenres = () => {
  const genres = useSelector(state => state.genres.genres)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const iconStyle = {
    color: 'red',
    cursor: 'pointer',
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name) {
      dispatch(addGenre({ name }))
      dispatch(getAllGenre())
      setName("")
    }
  }

  return (
    <div className="w-full h-full p-3 xs:p-8 ">
      <div className="flex flex-col">
        <h1 className="text-3xl xs:text-5xl font-bold text-white my-7">Manage Genres</h1>
        <form className="flex flex-col items-start gap-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Genre" name="name" className="p-3 outline-none bg-zinc-700 text-white w-full xs:w-[70%] border-none rounded" />
          <button onClick={handleSubmit} type="submit" className="px-4 py-3 bg-blue-500 text-white rounded">Add Genre</button>
        </form>
        <div className="flex flex-wrap pt-7 gap-4 mt-4">
          {genres.map((genre, index) => (
            <div key={index} className="flex items-center gap-2 p-2  xs:p-3 border border-zinc-700 text-white bg-zinc-800  font-semibold xs:font-bold rounded">
              <span>{genre.name}</span>
              <button type="button" onClick={() => dispatch(deleteGenre({ id: genre._id }))} className="text-red-500"><FiTrash2 style={iconStyle} /></button>
            </div>
          ))}
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default CreateGenres