import React from "react";
import './WeeklyWeatherList.scss';
import utilsService from "../../services/utilsService";
import { WeeklyWeatherPreview } from "../WeeklyWeatherPreview/WeeklyWeatherPreview";
export function WeeklyWeatherList(props) {

  const degreeSymbol = '°'
  // /need to use props.fiveDays
  var arr = [
    {
      day: 'Sun',
      degrees: `32${degreeSymbol}c`
    },
    {
      day: 'Sun',
      degrees: `32${degreeSymbol}c`
    },
    {
      day: 'Sun',
      degrees: `32${degreeSymbol}c`
    },
    {
      day: 'Sun',
      degrees: `32${degreeSymbol}c`
    },
    {
      day: 'Sun',
      degrees: `32${degreeSymbol}c`
    },
  ]
  return (
    <div className="weather-list-container flex align-center space-between">
      {
        // props.fiveDays &&
        arr.map(day => {
          let id = utilsService.idGen()
          return (
            <div className="daily-whther-card flex column justify-center align-center" key={id}>
              <WeeklyWeatherPreview day={day} />
            </div>
          )
        })
      }
    </div>
  );
}

