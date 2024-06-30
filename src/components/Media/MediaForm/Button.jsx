
import { FaArrowLeft } from 'react-icons/fa'

const Button = ({
    stage,
    setStage,
    type,
}) => {
    return (
        <>
            {type === "back" && (
                 <button type="button" onClick={() => setStage(stage - 1)} disabled={stage == 1 ? true : false} className={`rounded-full ${stage !== 1 ? "bg-[#ff0000af] cursor-pointer" : "bg-gray-800 cursor-auto"} w-12 h-12 flex items-center justify-center`} p-2><FaArrowLeft color="white" /></button>
            )}
            {type === "next" && (
                <button type="button" onClick={() => setStage(stage + 1)} className="bg-green-600 rounded-md px-5 py-2 text-white font-bold">Next</button>
            )}
        </>
    )
}

export default Button