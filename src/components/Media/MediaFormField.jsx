import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MediaFormField = ({
    register,
    name,
    type,
    placeholder,
    label,
    required,
    className,
    isTextArea,
    width,
    select,
    isDatePicker,
    dateValue,
    setDateValue,
    ...props
}) => {
    return (
        <>
            {isTextArea ? (
                <div className={`flex flex-col ${width}`}>
                    <label className='text-gray-300 pb-2 font-bold text-lg' htmlFor={name}>{label}</label>
                    <textarea
                        {...register(name, { required })}
                        name={name}
                        className={`${className} px-2 py-2 rounded-lg bg-zinc-700 border-none outline-none text-white w-full resize-none`}
                        placeholder={placeholder || ""}
                        {...props}
                    />
                </div>
            ) :
                type && !isDatePicker && (
                    <div className={`flex flex-col ${width}`}>
                        <label className='text-gray-300 pb-2 font-bold text-lg' htmlFor={name}>{label}</label>
                        <input
                            {...register(name, { required })}
                            name={name}
                            type={type}
                            className={`${className} px-2 py-2 rounded-lg w-full bg-zinc-700 border-none outline-none text-white `}
                            placeholder={placeholder || ""}
                            {...props}
                        />
                    </div>
                )
            }

            {select && (
                <div className={`flex flex-col ${width}`}>
                    <label className='text-gray-300 pb-2 font-bold text-lg' htmlFor={name}>{label}</label>
                    <select
                        {...register(name, { required })}
                        name={name}
                        className={`${className} px-2 py-2 rounded-lg w-full bg-zinc-700 border-none outline-none text-white `}
                        {...props}
                    >
                        {select.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {isDatePicker && (
                <div className={`flex flex-col ${width}`}>
                    <label className='text-gray-300 pb-2 font-bold text-lg' htmlFor={name}>{label}</label>
                    <DatePicker
                        selected={dateValue}
                        onChange={(date) => setDateValue(date)}
                        className={`${className} px-2 py-2 rounded-lg w-full bg-zinc-700 border-none outline-none text-white`}
                        dateFormat="yyyy"
                        showYearPicker
                        required
                        maxDate={Date.now()}
                        yearItemNumber={10}
                        {...props}
                    />
                </div>
            )}
        </>
    )
}

export default MediaFormField;
