import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import './HomePage.scss';
import weatherService from '../../services/weatherService.js'
import utilsService from "../../services/utilsService";
import { WeeklyWeatherList } from "../../cmps/WeeklyWeatherList/WeeklyWeatherList.jsx";
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDebouncedEffect } from "../../services/useDebouncedEffect.js";
import Modal from "../../cmps/Modal/Modal.jsx"
import { addFavorite, removeFavorite } from "../../actions/FavoriteActions.js"
import favoriteService from "../../services/favoriteService.js"

export function _HomePage(props) {
  const degreeSymbol = '°'
  const [isOpen, setIsOpen] = useState({open:false,title:''});
  const [currentWeatherDisplay, setCurrentWeatherDisplay] = useState(props.pickedFavorite ? props.pickedFavorite : { city: 'Tel Aviv', id: '215854', degrees: '39' })
  const [isFavorite, setIsFavorite] = useState( checkIsFavorite(currentWeatherDisplay.id) );
  const [searchTerm, setSearchTerm] = useState('');
  const [fiveDays, setFiveDays] = useState('');
  const inputRef = useRef();


  // useDebouncedEffect(() => setCurretCityDisplay(), [searchTerm], 1000);

  // useEffect(() => {
  //   (async () => {
  //     let DailyForecasts = await weatherService.getFiveDays(currentWeatherDisplay.id);
  //     let days = weatherService.getFiveDaysAndDegreesArray(DailyForecasts.DailyForecasts)
  //     setFiveDays(days);
  //   })()
  // }, [])

  // useEffect(() => {
  //   (async () => {
  //     let currentWeather = await weatherService.getCurrentWeather(currentWeatherDisplay.id)
  //     let degrees = `${currentWeather[0].Temperature.Metric.Value}${degreeSymbol}c`;
  //     setCurrentWeatherDisplay({ ...currentWeatherDisplay, degrees })
  //   })()
  // }, [])

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  function handleChange({ target }) {
    if (!utilsService.isEnglishOnly(target.value)) {
      setIsOpen({open:true,title:'Only English letter are allowed'});
    }
    const regex = /[A-Za-z]/;
    let chars = target.value.split('');
    let char = chars.pop();
    if ((!regex.test(char)) && (char != ' ')) {
      target.value = chars.join('');
    }

    const field = target.name;
    const value = target.value;

    switch (field) {
      case 'term':
        setSearchTerm(value)
        break;
      default:
        console.log('Err updating searchTerm')
    }
  }


  // async function setCurretCityDisplay() {
  //   if (searchTerm) {
  //     let location = await weatherService.getlocationDetails(searchTerm);
  //     if (location.length === 0) {
  //       setIsOpen({open:true,title:'No location found'});
  //       return;
  //     }
  //     let id = location[0].Key;
  //     let currentWeather = await weatherService.getCurrentWeather(id);
  //     let degrees = `${currentWeather[0].Temperature.Metric.Value}${degreeSymbol}c`;
  //     let city = location[0].LocalizedName;
  //     let DailyForecasts = await weatherService.getFiveDays(id);
  //     let days = weatherService.getFiveDaysAndDegreesArray(DailyForecasts.DailyForecasts)
  //     setFiveDays(days);
  //     setCurrentWeatherDisplay({ city, id, degrees });
  //     setIsFavorite(checkIsFavorite(id));
  //   }
  // }

  async function addOrRemoveFavorite() {
    if (isFavorite) {
      await props.removeFavorite(currentWeatherDisplay.id)
      setIsFavorite(false);
    } else {
      await props.addFavorite(currentWeatherDisplay);
      setIsFavorite(true);
    }
  }

  function checkIsFavorite(id) {
    return favoriteService.isFavorite(props.favorites, id);
  }


  function setIsOpenFalse() {
    setIsOpen({open:false,title:''});
  }


  useEffect(() => {
    console.log(props.favorites)
    console.log(props.pickedFavorite)
  }, [props.favorites, props.pickedFavorite])


  return (
    <main className="home-page-container flex align-center justify-center">
      <div className="weather-container flex column align-center">
        <div className="search-weather-container flex">
          <input className="search-weather" name="term" value={searchTerm} ref={inputRef} onChange={handleChange} />
          <div className="search-icon-container flex align-center justify-center">
            <SearchIcon />
          </div>
        </div>
        <div className="weekly-weather-container flex column align-center space-around">
          <div className="top-container-in-weekly-weather flex space-between">
            <div className="current-weather-display">
              <div className="city-current-weather">{currentWeatherDisplay.city && currentWeatherDisplay.city}</div>
              <div className="city-current-degrees">{currentWeatherDisplay.degrees && currentWeatherDisplay.degrees}</div>
            </div>
            <div className="add-to-favorite-container flex ">
              {
                isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
              <button className="add-or-remove-from-favorite-btn flex align-center justify-center" onClick={() => addOrRemoveFavorite()}>{isFavorite ? 'Remove From Favorite' : 'Add to Favorite'}</button>
            </div>
          </div>
          <div className="bottom-container-in-weekly-weather flex align-center justify-center">
            <WeeklyWeatherList fiveDays={fiveDays} />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpenFalse={setIsOpenFalse} />
    </main>
  );
}

function mapStateProps(state) {
  return {
    favorites: state.FavoriteReducer.favorites,
    pickedFavorite: state.FavoriteReducer.pickedFavorite,
  }
}

const mapDispatchToProps = {
  addFavorite,
  removeFavorite
}

export const HomePage = connect(mapStateProps, mapDispatchToProps)(_HomePage)
