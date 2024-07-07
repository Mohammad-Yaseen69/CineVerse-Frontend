import { AiOutlineSearch } from 'react-icons/ai';

const SearchBox = ({
    className,
    placeholder,
    query,
    setQuery,
    handleQuery,
    handleKeyPress
}) => {
    return (
        <div className={`flex items-center  justify-center w-[90%] sm:w-[70%]  lg:w-[60%] ${className}`}>
            <div className='w-full relative'>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-white outline-none border-none text-sm rounded-full py-4 sm:py-5 z-40 px-4 pr-12 w-full text-black"
                    placeholder={"Search your favorite Movies, Series, and Anime"}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleQuery} className="absolute flex justify-center items-center right-0 p-6 sm:p-7 top-1/2 transform -translate-y-1/2 bg-[#FF4141] h-full rounded-r-full">
                    <AiOutlineSearch color='white' className="size-7" />
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
