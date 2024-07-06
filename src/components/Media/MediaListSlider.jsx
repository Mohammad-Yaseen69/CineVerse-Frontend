import React from 'react'
import MediaCard from './MediaCard'
import { useSelector } from 'react-redux'

const MediaListSlider = ({ mediaObj, name }) => {
    const loading = useSelector(state => state.media.loading)




    return (
        <div className='w-full  p-3 xs:p-7 sm:p-12 '>
            <h1 className='text-4xl text-white font-monstserrat font-bold pb-16'>{name}</h1>
            <div className='grid grid-flow-col overflow-x-auto gap-[15px]'>
                {loading && (
                    <>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                        <div className="mb-8 cursor-pointer skeleton rounded-xl bg-zinc-800 w-[125px] sm:w-[160px] md:w-[220px]">
                            <div className="posterBlock"></div>
                        </div>
                    </>
                )}
                {!loading && mediaObj?.map((media) => (
                    <MediaCard
                        key={media._id}
                        genres={media?.genre}
                        img={media?.img?.publicUrl}
                        name={media?.name}
                        rating={media?.rating}
                        releaseYear={media?.releaseYear}
                        id={media?._id}
                    />
                ))}
            </div>


        </div>
    )
}

export default MediaListSlider