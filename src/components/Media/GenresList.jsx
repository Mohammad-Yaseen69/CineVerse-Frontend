const GenresList = ({ genre , isDetailsPage}) => {
    return (
        <div className={`bg-blue-500 flex-1 text-center text-white rounded p-1 ${isDetailsPage && "max-w-24 bg-pink-700"}`}>
            <h6 className="whitespace-nowrap text-[13px]">
                {genre}
            </h6>
        </div>
    )
}

export default GenresList