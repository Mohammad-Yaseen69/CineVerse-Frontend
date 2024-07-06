import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

const RatingCircle = ({ rating ,className}) => {
    return (
        <div className={`${className} rounded-[50%] bg-white p-[2px]`}>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                background
                className=''
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    textColor: "black",
                    backgroundColor: "white",
                    trailColor : "transparent",
                    textSize: "32px",
                })
                }
            />
        </div>

    )
}

export default RatingCircle