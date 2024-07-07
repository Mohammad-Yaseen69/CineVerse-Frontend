import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMedia } from "../store/mediaSlice"
import { useDispatch, useSelector } from 'react-redux'

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
  return (
    <div></div>
  )
}

export default Media