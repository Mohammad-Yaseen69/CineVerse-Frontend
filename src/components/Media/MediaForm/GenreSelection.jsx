import React from 'react'
import Select from 'react-select'

const GenreSelection = ({
    genres,
    handleGenreChange,
    selectedGenre,
}) => {
    return (
        <div className={`flex flex-col`}>
            <label className='text-gray-300 pb-2 font-bold text-lg' htmlFor="">Genres:</label>
            <Select
                isMulti
                name="genres"
                options={genres.map(genre => ({ label: genre.name, value: genre.name }))}
                className="basic-multi-select"
                styles={{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: '#3f3f46',
                        outline : "none",
                        border : "none"
                    }),
                }}
                classNamePrefix="select"
                onChange={handleGenreChange}
                defaultValue={selectedGenre}
            />
        </div>
    )
}

export default GenreSelection