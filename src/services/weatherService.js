import axios from 'axios';
import utilsService from './utilsService';
export default {
    getlocationDetails,
    getFiveDays,
    getFiveDaysAndDegreesArray,
    getCurrentWeather,
    getCurrentWeatherForFavoritesDisplay,
    getlocationDetailsByPos,
    swapDegreesByUnitTypeForDailyForecasts,
    swapDegreesByUnitTypeForFavorites
}


const apiKey = 'b6Q9LTBO14ATtPxCAazoTXOph38n42Zc'


async function getCurrentWeather(cityKey) {
    try {
        const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&language=en-us&details=false`);
        const data = response.data;
        return data;
    } catch (errors) {
        console.error(errors);
    }
}

async function getlocationDetails(location) {
    try {
        const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&language=en-us&q=${location}`);
        const data = response.data;
        return data;
    } catch (errors) {
        console.error(errors);
    }
}


async function getFiveDays(cityKey) {
    try {
        const response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&language=en-us&details=false&metric=false`);
        const data = response.data;
        return data;
    } catch (errors) {
        console.error(errors);
    }
}


function getFiveDaysAndDegreesArray(DailyForecasts, unitType) {
    let days = [];
    DailyForecasts.forEach(day => {
        let temperature = (day.Temperature.Minimum.Value + day.Temperature.Maximum.Value) / 2;
        days.push(
            {
                day: utilsService.getDayLettersByDate(day.Date),
                degrees: (unitType === 'c') ? utilsService.fToC(temperature) : temperature
            }
        )
    });
    return days;
}


async function getCurrentWeatherForFavoritesDisplay(favorites) {
    let newFavorites = [];
    for (const favorite of favorites) {
        let currentWeather = await getCurrentWeather(favorite.id);
        newFavorites.push({
            city: favorite.city,
            id: favorite.id,
            degrees: Math.round(currentWeather[0].Temperature.Metric.Value),
            weather: currentWeather[0].WeatherText
        });
    }
    return newFavorites
}



async function getlocationDetailsByPos(pos) {
    try {
        const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&language=en-us&details=false&toplevel=false&q=${pos.lat},${pos.lon}`);
        const data = response.data;
        const currentWeather = await getCurrentWeather(data.Key);
        return {
            city: data.LocalizedName,
            id: data.Key,
            degrees: Math.round(currentWeather[0].Temperature.Metric.Value)
        };
    } catch (errors) {
        console.error(errors);
    }
}


function swapDegreesByUnitTypeForDailyForecasts(DailyForecasts, unitType) {
    let days = [];
    DailyForecasts.forEach(day => {
        days.push(
            {
                day: day.day,
                degrees: (unitType === 'c') ? utilsService.fToC(day.degrees) : utilsService.cToF(day.degrees)
            }
        )
    });
    return days;
}


function swapDegreesByUnitTypeForFavorites(favorites, unitType) {
    let updatedFavorites = [];
    favorites.forEach(favorite => {
        updatedFavorites.push(
            {
                city:favorite.city,
                id:favorite.id,
                degrees: (unitType === 'c') ? utilsService.fToC(favorite.degrees) : utilsService.cToF(favorite.degrees),
                weather: favorite.weather
            }
        )
    });
    return updatedFavorites;
}

