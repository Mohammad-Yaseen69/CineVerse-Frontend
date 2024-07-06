const FormStructure = ({
    children,
    name,
    onSubmit
}) => {
  return (
    <div className='w-full max-xs:pt-10 h-[100vh] xs:h-[110vh] flex'>
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="font-monstserrat text-white font-extrabold  text-3xl md-5 xs:text-5xl xs:mb-10">{name}</h1>
      <form onSubmit={onSubmit} action="" className="flex w-full  flex-col md:w-[60%] gap-3 items-start mx-auto p-6">
        {children}
      </form>
    </div>
  </div>
  )
}

export default FormStructure