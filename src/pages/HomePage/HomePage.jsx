import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import './HomePage.scss';
import weatherService from '../../services/weatherService.js'
import utilsService from "../../services/utilsService";
import { WeeklyWeatherList } from "../../cmps/WeeklyWeatherList/WeeklyWeatherList.jsx";
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDebouncedEffect } from "../../services/Hooks/useDebouncedEffect.js";
import useGeoLocation from "../../services/Hooks/useGeoLocation.js";
import Modal from "../../cmps/Modal/Modal.jsx"
import { addFavorite, removeFavorite} from "../../actions/FavoriteActions.js"
import {setGeoLocation} from "../../actions/WeatherAction.js"
import favoriteService from "../../services/favoriteService.js"

export function _HomePage(props) {
  const degreeSymbol = '°'
  const [isOpen, setIsOpen] = useState({ open: false, title: '' });
  // Set current weather details for upper container default will be Tel Aviv,
  // once approved geo location he will be the default.
  const [currentWeatherDisplay, setCurrentWeatherDisplay] = useState(props.pickedFavorite ?
    props.pickedFavorite : props.geoLocation ?
      props.geoLocation : { city: 'Tel Aviv', id: '215854', degrees: '' });
  const [isFavorite, setIsFavorite] = useState(checkIsFavorite(currentWeatherDisplay.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [fiveDays, setFiveDays] = useState('');
  const inputRef = useRef();
  const location = useGeoLocation();


  // Set geo location
  useEffect(() => {
    (async () => {
      if (location.loaded && !props.geoLocation) {
        let currentGeoLocation = await weatherService.getlocationDetailsByPos(location.coordinates);
        setCurrentWeatherDisplay(currentGeoLocation);
        props.setGeoLocation(currentGeoLocation);
        setIsFavorite(false);
      }
    })()
  }, [location])

  // Use debounce hook for input.
  useDebouncedEffect(() => setCurretCityDisplay(), [searchTerm], 1000);

  //When mount set  daily forecasts
  useEffect(() => {
    (async () => {
      let DailyForecasts = await weatherService.getFiveDays(currentWeatherDisplay.id);
      let days = weatherService.getFiveDaysAndDegreesArray(DailyForecasts.DailyForecasts,props.unitType)
      setFiveDays(days);
    })()
  }, [])

  //When mount set current weather
  useEffect(() => {
    (async () => {
      let currentWeather = await weatherService.getCurrentWeather(currentWeatherDisplay.id)
      let degrees = Math.round(currentWeather[0].Temperature.Metric.Value);
      setCurrentWeatherDisplay({ ...currentWeatherDisplay, degrees })
    })()
  }, [])

  //When mount set focus on input
  useEffect(() => {
    inputRef.current.focus();
  }, [])

 // Evey time unit type changes, update all weather details.
  useEffect(() => {
    if (fiveDays) {
      setFiveDays(weatherService.swapDegreesByUnitTypeForDailyForecasts(fiveDays, props.unitType));
    }
    if(currentWeatherDisplay){
      setCurrentWeatherDisplay({...currentWeatherDisplay,degrees:utilsService.swapUnitType(currentWeatherDisplay.degrees,props.unitType)});
    }
  }, [props.unitType])


  // Handle inpute
  function handleChange({ target }) {
    if (!utilsService.isEnglishOnly(target.value)) {
      setIsOpen({ open: true, title: 'Only English letter are allowed' });
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

// When debounce stops set current city details
  async function setCurretCityDisplay() {
    if (searchTerm) {
      let location = await weatherService.getlocationDetails(searchTerm);
      if (location.length === 0) {
        setIsOpen({ open: true, title: 'No location found' });
        return;
      }
      let id = location[0].Key;
      let currentWeather = await weatherService.getCurrentWeather(id);
      let degrees = Math.round(currentWeather[0].Temperature.Metric.Value);
      let city = location[0].LocalizedName;
      let DailyForecasts = await weatherService.getFiveDays(id);
      let days = weatherService.getFiveDaysAndDegreesArray(DailyForecasts.DailyForecasts, props.unitType)
      setFiveDays(days);
      setCurrentWeatherDisplay({ city, id, degrees });
      setIsFavorite(checkIsFavorite(id));
    }
  }

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
    setIsOpen({ open: false, title: '' });
  }


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
              <div className="city-current-degrees">{currentWeatherDisplay.degrees && `${currentWeatherDisplay.degrees}${degreeSymbol}${props.unitType&&props.unitType}`}</div>
            </div>
            <div className="add-to-favorite-container flex ">
              {
                isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
              <button className="add-or-remove-from-favorite-btn flex align-center justify-center" onClick={() => addOrRemoveFavorite()}>{isFavorite ? 'Remove From Favorite' : 'Add to Favorite'}</button>
            </div>
          </div>
          <div className="bottom-container-in-weekly-weather flex align-center justify-center">
            <WeeklyWeatherList fiveDays={fiveDays} unitType={props.unitType } />
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
    unitType: state.WeatherReducer.unitType,
    geoLocation: state.WeatherReducer.geoLocation,
  }
}

const mapDispatchToProps = {
  addFavorite,
  removeFavorite,
  setGeoLocation
}

export const HomePage = connect(mapStateProps, mapDispatchToProps)(_HomePage)
