import { combineReducers } from 'redux';
import FavoriteReducer from './FavoriteReducer.js'
import WeatherReducer from './WeatherReducer.js'


const rootReducer = combineReducers({
  FavoriteReducer,
  WeatherReducer
})

export default rootReducer;