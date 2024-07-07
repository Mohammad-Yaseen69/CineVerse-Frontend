import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { searchMedia } from "../store/mediaSlice"
import { MediaCard } from "../components"

const Search = () => {
    const { query } = useParams()
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])
    const [data, setData] = useState([])
    const loading = useSelector(state => state.media.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchMedia({
            query,
            page,
            limit: 10
        })).then((res) => {
            setData([...res.payload?.data?.docs])
            setTotalPages(Array.from({ length: res.payload?.data?.totalPages }, (_, index) => index + 1))
        })
    }, [page])

    // Calculate current page set to display in pagination
    const currentPageSet = totalPages.slice(Math.max(0, page - 2), Math.min(totalPages.length, page + 1));

    return (
        <div className="w-full h-screen px-3 xs:px-6 sm:px-12 pt-24">
            <h1 className="text-white font-monstserrat font-extrabold text-xl xs:text-3xl">Results for "{query}"</h1>

            {loading && <div className="flex w-full h-screen justify-center items-center absolute top-0 left-0"><div className="loader2"></div></div>}

            {!loading && data?.length > 0 &&
                <>
                    <div className="pt-11 flex max-xs:justify-center flex-wrap xs:gap-x-8">
                        {
                            data?.map((media, index) => (
                                <MediaCard
                                    key={index}
                                    // genres={media.genre}
                                    name={media.name}
                                    releaseYear={media.releaseYear}
                                    img={media.img.publicUrl}
                                    id={media._id}
                                    isSearchCard={true}
                                />
                            ))
                        }
                    </div>
                    <div className=" pb-3 gap-1  flex justify-center flex-nowrap">
                        {/* Previous page button */}
                        {page > 1 && (
                            <div className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-zinc-700 hover:bg-zinc-800 text-white" onClick={() => setPage(page - 1)}>
                                {"<"}
                            </div>
                        )}

                        {/* Page numbers */}
                        {currentPageSet.map((pageNumber) => (
                            <div key={pageNumber} className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ${page === pageNumber ? 'bg-white text-black' : 'bg-zinc-700 hover:bg-white hover:text-black text-white'}`} onClick={() => setPage(pageNumber)}>
                                {pageNumber}
                            </div>
                        ))}

                        {/* Next page button */}
                        {page < totalPages.length && (
                            <div className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-zinc-700 hover:bg-zinc-800 text-white" onClick={() => setPage(page + 1)}>
                                {">"}
                            </div>
                        )}
                    </div>
                </>
            }

            {!loading && data?.length === 0 && <h1 className="text-gray-400 pt-6 font-monstserrat font-extrabold text-lg">No results found</h1>}

        </div>
    )
}

export default Search;
