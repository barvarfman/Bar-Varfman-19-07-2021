import React from "react";
import './FavoritePreview.scss';

// Render favorite
export function FavoritePreview(props) {
  const degreeSymbol = '°'
  return (
        <>
        <div className="top-favorite-description-container">
         <div className="favorite-city">
        {props.favorite&&props.favorite.city} 
        </div>
        <div className="favorite-degrees">
        {props.favorite&&`${props.favorite.degrees}${degreeSymbol}${props.unitType&&props.unitType}`} 
        </div>
        </div>

        <div className="favorite-weather-text">
        {props.favorite&&props.favorite.weather}
        </div>
        </>
  );
}

