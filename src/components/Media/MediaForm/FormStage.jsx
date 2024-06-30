import React from 'react'

const FormStage = ({
    stage,
    stageNumber,
    children
}) => {
    return (
        <>
            {stage == stageNumber && (
                <div className="flex w-[97%] xs:w-[95%] sm:w-[70%] md:w-1/2 flex-col gap-5">
                    {children}
                </div>
            )}
        </>
    )
}

export default FormStage