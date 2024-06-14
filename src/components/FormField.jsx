const FormField = ({
    id,
    type,
    placeholder,
    registerFunction
}) => {
    return (
        <>
            <input
                type={type}
                id={id}
                required
                placeholder={placeholder}
                {...registerFunction(id)}
                className="w-full outline-none p-4 mb-4  border-none rounded-xl bg-zinc-800 text-gray-200 focus:outline-none"
            />
        </>
    )
}

export default FormField