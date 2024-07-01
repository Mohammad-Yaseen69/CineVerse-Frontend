import React from 'react'

const Cards = ({
    isMediaCard,
    isCommentsCard,
    isUsersCard,
    data,
}) => {
    return (
        <>
            {
                isMediaCard ? (
                    <div className="bg-gradient-to-b flex items-center justify-center from-green-500 relative to-lime-800 rounded-lg   min-w-60  py-14">
                        <span className='absolute bg-gradient-to-b from-green-500 to-lime-800 -top-4 left-1/2 -translate-x-1/2 rounded-full text-black font-bold py-2 px-4'>Media</span>
                        <h2 className="text-white absolute bottom-2  text-sm text-center  font-semibold ">Total Media's in your app</h2>
                        <p className="text-white text-center font-bold font-monstserrat text-3xl">{data}</p>
                    </div>
                ) : isCommentsCard ? (
                    <div className="bg-gradient-to-b flex items-center justify-center relative from-green-400 to-green-900  rounded-lg  min-w-60   py-14">
                        <span className='absolute bg-gradient-to-b from-green-400 to-green-900   -top-4 left-1/2 -translate-x-1/2 rounded-full text-black font-bold py-2 px-4'>Comments</span>
                        <h2 className="text-white absolute bottom-2  text-sm text-center  font-semibold ">Total Comments in your app</h2>
                        <p className="text-white text-center font-bold font-monstserrat text-3xl">{data}</p>
                    </div>
                ) : isUsersCard ? (
                    <div className="bg-gradient-to-b flex items-center justify-center relative from-green-600 to-green-900 rounded-lg  min-w-60   py-14">
                        <span className='absolute bg-gradient-to-b from-green-600 to-green-900 -top-4 left-1/2 -translate-x-1/2 rounded-full text-black font-bold py-2 px-4'>Users</span>
                        <h2 className="text-white absolute bottom-2  text-sm text-center  font-semibold ">Total Users in your app</h2>
                        <p className="text-white text-center font-bold font-monstserrat text-3xl">{data}</p>
                    </div>
                ) : null
            }
        </>
    )
}

export default Cards