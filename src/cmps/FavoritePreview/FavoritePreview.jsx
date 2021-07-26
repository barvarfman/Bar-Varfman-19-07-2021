import React from "react";
import './FavoritePreview.scss';


export function FavoritePreview(props) {
  return (
        <>
        <div className="top-favorite-description-container">
         <div className="favorite-city">
        {props.favorite.city} 
        </div>
        <div className="favorite-degrees">
        {props.favorite.degrees} 
        </div>
        </div>

        <div className="favorite-weather-text">
        {/* {props.favorite.weather} */}
        Suny
        </div>
        </>
  );
}

