import { FiTrash2, FiEdit } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Img } from "../../components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchMedia, deleteMedia } from "../../store/mediaSlice"
import { FaArrowLeft } from 'react-icons/fa'

const ManageMedia = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [media, setMedia] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(searchMedia({
      sortBy: "createdAt",
      sortType: "scs",
      page: page,
      limit: 50
    })).then((res) => {
      setMedia(res.payload?.data?.docs)
    })
  }, [])

  return (
    <div className='p-4 xs:p-7 sm:p-14 '>
      <Link to="/admin" className="absolute left-2 top-6 xs:left-6 font-bold text-white font-roboto"><FaArrowLeft color="white" size={25} /> </Link>
      <h1 className="text-3xl xs:text-5xl font-bold text-white my-7">Manage Media</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-5'>
        {media?.map((item, index) => (
          <div key={index} className="flex relative flex-col min-w-52 items-center  p-2  xs:p-3 border border-zinc-700 bg-zinc-800 rounded">
            <div className='py-7'>
              <Img src={item?.img.publicUrl} className="w-48 h-40  object-cover rounded" />
            </div>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-black font-bold bg-white rounded-full  px-3 py-1 ">{item?.type}</span>
            <span className='font-bold text-white text-center pb-3 font-monstserrat text-lg'>{item?.name} ({item?.releaseYear}) </span>

            <div className='flex justify-around items-center w-full'>
              <button type="button" onClick={() => navigate(`/admin/media/${item._id}/update`)} className="text-red-500"><FiEdit color='green' size={25} /></button>
              <button type="button" onClick={() => {
                const deleteItem = dispatch(deleteMedia({ id: item._id }))

                if (deleteItem.type === "media/delete/fulfilled") {
                  navigate("/admin")
                }
              }} className="text-red-500"><FiTrash2 color='red' size={25} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageMedia