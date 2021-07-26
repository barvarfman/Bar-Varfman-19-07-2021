import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import './FavoritePage.scss';
import { FavoriteList } from "../../cmps/FavoriteList/FavoriteList.jsx"
import { updatePickedFavorite } from "../../actions/FavoriteActions.js"
import weatherService from '../../services/weatherService.js'
export function _FavoritePage(props) {

  // const [advertiseContent, setAdvertiseContent] = useState('')

  // useEffect(() => {
  //   (async () => {
  //     // let currentWeather = await weatherService.getCurrentWeather(currentWeatherDisplay.id)
  //     // let degrees = `${currentWeather[0].Temperature.Metric.Value}${degreeSymbol}c`;
     
  //   })()
  // }, [])

  function updatePickedFavorite(favorite) {
    props.history.push('/');
    props.updatePickedFavorite(favorite)
  }

  return (
    <main className="main-favorite-container">
      <div className="favorite-container">
        <FavoriteList favorites={props.favorites} updatePickedFavorite={updatePickedFavorite} />
      </div>
    </main>
  );
}

function mapStateProps(state) {
  return {
    favorites: state.FavoriteReducer.favorites,
  }
}

const mapDispatchToProps = {
  updatePickedFavorite
}

export const FavoritePage = connect(mapStateProps, mapDispatchToProps)(_FavoritePage)