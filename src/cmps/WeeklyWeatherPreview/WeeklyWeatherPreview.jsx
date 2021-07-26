import React from "react";
import './WeeklyWeatherPreview.scss';


export function WeeklyWeatherPreview(props) {
  return (
        <>
         <div className="day-title">
        {props.day.day} 
        </div>
        <div className="daily-title-degrees">
        {props.day.degrees} 
        </div>
        </>
  );
}

