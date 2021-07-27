import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import './FavoritePage.scss';
import { FavoriteList } from "../../cmps/FavoriteList/FavoriteList.jsx"
import { updatePickedFavorite } from "../../actions/FavoriteActions.js"
import weatherService from '../../services/weatherService.js'
export function _FavoritePage(props) {

  const [favorites, setFavorites] = useState('')

  // When mount get the current weather details for display.
  useEffect(() => {
    (async () => {
      let currentFavoritesWeather = await  weatherService.getCurrentWeatherForFavoritesDisplay(props.favorites);
        setFavorites(currentFavoritesWeather)
    })()
  }, [])

  // Evey time unit type changes, update all favorites cards.
  useEffect(() => {
    if (favorites) {
      setFavorites(weatherService.swapDegreesByUnitTypeForFavorites(favorites, props.unitType));
    }
  }, [props.unitType])

// Update the picked city to display in the store, and go back to home page
  function updatePickedFavorite(favorite) {
    props.history.push('/');
    props.updatePickedFavorite(favorite)
  }

  return (
    <main className="main-favorite-container">
      <div className="favorite-container">
        {/* need to be just favorites */}
        <FavoriteList favorites={favorites} unitType={props.unitType} updatePickedFavorite={updatePickedFavorite} />
      </div>
    </main>
  );
}

function mapStateProps(state) {
  return {
    favorites: state.FavoriteReducer.favorites,
    unitType: state.WeatherReducer.unitType
  }
}

const mapDispatchToProps = {
  updatePickedFavorite
}

export const FavoritePage = connect(mapStateProps, mapDispatchToProps)(_FavoritePage)