import React from "react";
import './WeeklyWeatherList.scss';
import utilsService from "../../services/utilsService";
import { WeeklyWeatherPreview } from "../WeeklyWeatherPreview/WeeklyWeatherPreview";
export function WeeklyWeatherList(props) {


  return (
    <div className="weather-list-container flex align-center space-between">
      {
        //If fiveDays prop have value, then render all saved favorites.
        props.fiveDays &&
        props.fiveDays.map(day => {
          let id = utilsService.idGen()
          return (
            <div className="daily-whther-card flex column justify-center align-center" key={id}>
            {/* pass unit type and each day of the five to WeeklyWeatherPreview component */}
              <WeeklyWeatherPreview day={day} unitType={props.unitType} />
            </div>
          )
        })
      }
    </div>
  );
}

