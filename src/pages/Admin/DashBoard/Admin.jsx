import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Sidebar from "./SideBar"
import Cards from "./Cards"
import { getAllMedia } from "../../../store/mediaSlice"
import { getAllUsers } from "../../../store/userslice"
import { useEffect, useState } from "react"
import { Img } from "../../../components"

const Admin = () => {
  const dispatch = useDispatch()
  const [media, setMedia] = useState([])
  const [lengths, setLengths] = useState({
    user: 0,
    media: 0,
    comment: 0
  })


  useEffect(() => {
    const getData = async () => {
      const users = await dispatch(getAllUsers())
      const medias = await dispatch(getAllMedia())
      const reviewsLength = medias.payload?.data?.map((media) => media.reviews).reduce((acc, curr) => acc + curr, 0)

      console.log(users, medias)

      setLengths({
        user: users.payload?.data?.length,
        media: medias.payload?.data?.length,
        comment: reviewsLength
      })

      setMedia(medias.payload?.data?.sort((a, b) => b.reviews - a.reviews))
    }

    getData()
  }, [])

  console.log(media)



  return (
    <div className=' w-full h-screen bg-zinc-900  z-10'>
      <Sidebar />
      <div className="md:absolute md:right-0 px-3 sm:px-8 md:px-14 lg:px-20 xl:px-44 pt-24 md:pt-14 max-md:w-full main-admin">
        <div className="flex justify-around md:justify-between gap-10 flex-wrap">
          <Cards isMediaCard data={lengths.media} />
          <Cards isUsersCard data={lengths.user} />
          <Cards isCommentsCard data={lengths.comment} />

          <div className="w-full f border-t pt-3 border-[#242424] ">
            <div className="flex justify-between">
              <h1 className="text-xl text-white font-bold">Top Media</h1>
              <h1 className="text-xl text-white font-bold">Comments</h1>
            </div>


            <div className="flex flex-col gap-7 py-8">
              {media?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <Img src={item.img.publicUrl} className="h-16 w-24 rounded" />
                    <div>
                      <h1 className="font-bold text-white ">{item.name}</h1>
                      <p className="font-semibold text-gray-200">{item.releaseYear}</p>
                    </div>
                  </div>

                  <p className="font-extrabold text-white text-xl">{item.reviews}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin