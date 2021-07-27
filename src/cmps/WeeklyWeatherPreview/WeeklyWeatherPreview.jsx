import React from "react";
import './WeeklyWeatherPreview.scss';


export function WeeklyWeatherPreview(props) {
  const degreeSymbol = '°'
  return (
        <>
         <div className="day-title">
           {/* Render the day of the week */}
        {props.day.day} 
        </div>
        <div className="daily-title-degrees">
          {/* Render each day forecast degrees */}
        {`${props.day.degrees}${degreeSymbol}${props.unitType&&props.unitType}`} 
        </div>
        </>
  );
}

