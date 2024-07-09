import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Select from "react-select"
import { searchMedia } from "../store/mediaSlice"
import { MediaCard } from '../components';

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#3f3f46',
        border: 'white',
        outline: '#3f3f46',
        color: 'white',
        borderRadius: '999px'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'skyblue' : 'white',
        color: state.isSelected ? 'white' : '#3f3f46',
        '&:hover': {
            backgroundColor: state.isSelected ? 'skyblue' : 'skyblue'
        },
        cursor: 'pointer'
    }),
    input: (provided) => ({
        ...provided,
        color: 'white'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    })
};

const sortOptions = [
    {
        label: "Rating desc",
        value: {
            sortBy: "rating",
            sortType: "desc"
        }
    },
    {
        label: "Rating asc",
        value: {
            sortBy: "rating",
            sortType: "asc"
        }
    },
    {
        label: "Year desc",
        value: {
            sortBy: "releaseYear",
            sortType: "desc"
        }
    },
    {
        label: "Year asc",
        value: {
            sortBy: "releaseYear",
            sortType: "asc"
        }
    },
]

const typeOptions = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'series' }
]

const Explore = () => {
    const genres = useSelector((state) => state.genres.genres);
    const loading = useSelector(state => state.media.loading)
    const dispatch = useDispatch()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [type, setType] = useState("movie")
    const [sortBy, setSortBy] = useState({})
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])
    const [data, setData] = useState([])

    const genresOptions = genres.map((genre) => ({
        label: genre.name,
        value: genre.name
    }))

    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions.map(option => option.value));
    }

    const handleSort = (sort) => {
        setSortBy(sort.value)
    }


    const handleType = (type) => {
        setType(type.value)
    }

    useEffect(() => {
        dispatch(searchMedia({
            genres: selectedGenres,
            type,
            sortBy: sortBy.sortBy ? sortBy.sortBy : undefined,
            sortType: sortBy.sortType ? sortBy.sortType : undefined,
            page: page,
            limit: 20
        })).then((res) => {
            setTotalPages(Array.from({ length: res.payload?.data?.totalPages }, (_, index) => index + 1))
            setData(res.payload?.data?.docs)
        })
    }, [selectedGenres, type, sortBy, page])

    const currentPageSet = totalPages.slice(Math.max(0, page - 2), Math.min(totalPages.length, page + 1));

    return (
        <div className="w-full h-screen px-3 xs:px-6 sm:px-12 pt-24">
            <div className='flex max-md:flex-col max-md:gap-4 justify-between w-full '>
                <h1 className="text-white font-monstserrat font-extrabold text-xl xs:text-3xl">Explore</h1>
                <div className='flex gap-3 max-md:flex-col'>
                    <Select
                        isMulti
                        name='genres'
                        className="basic-multi-select md:w-72 outline-none"
                        placeholder="Select Genres"
                        styles={customStyles}
                        onChange={handleGenreChange}
                        options={genresOptions}
                    />
                    <div className='flex gap-3'>
                        <Select
                            name='sort'
                            className="basic-multi-select w-1/2 md:w-72 outline-none"
                            placeholder="Sort By"
                            styles={customStyles}
                            options={sortOptions}
                            onChange={handleSort}
                        />
                        <Select
                            name='sort'
                            className="basic-multi-select w-1/2 md:w-40 outline-none"
                            placeholder="Type"
                            onChange={handleType}
                            styles={customStyles}
                            options={typeOptions}
                            value={typeOptions.find(option => option.value === type)}
                        />
                    </div>
                </div>
            </div>
            {loading && <div className="flex w-full h-screen justify-center items-center absolute top-0 left-0"><div className="loader2"></div></div>}

            {!loading && data?.length > 0 &&
                <>
                    <div className="pt-11 flex max-sm:justify-center flex-wrap gap-x-3 xs:gap-x-8">
                        {
                            data?.map((media, index) => (
                                <MediaCard
                                    key={index}
                                    genres={media.genre}
                                    name={media.name}
                                    releaseYear={media.releaseYear}
                                    img={media.img.publicUrl}
                                    id={media._id}
                                    rating={media.rating}
                                    isSearchCard={true}
                                />
                            ))
                        }
                    </div>
                   {totalPages.length > 1 && <div className=" pb-3 gap-1  flex justify-center flex-nowrap">
                        {page > 1 && (
                            <div className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-zinc-700 hover:bg-zinc-800 text-white" onClick={() => setPage(page - 1)}>
                                {"<"}
                            </div>
                        )}

                        {currentPageSet.map((pageNumber) => (
                            <div key={pageNumber} className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ${page === pageNumber ? 'bg-white text-black' : 'bg-zinc-700 hover:bg-white hover:text-black text-white'}`} onClick={() => setPage(pageNumber)}>
                                {pageNumber}
                            </div>
                        ))}

                        {page < totalPages.length && (
                            <div className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-zinc-700 hover:bg-zinc-800 text-white" onClick={() => setPage(page + 1)}>
                                {">"}
                            </div>
                        )}
                    </div>}
                </>
            }
            {!loading && data?.length === 0 && <h1 className="text-gray-400 pt-6 font-monstserrat font-extrabold text-lg">No results found</h1>}
        </div>
    )
}

export default Explore