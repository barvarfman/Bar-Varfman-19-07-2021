import axios from 'axios';
import utilsService from './utilsService';
export default {
    getlocationDetails,
    getFiveDays,
    getFiveDaysAndDegreesArray,
    getCurrentWeather
}
const degreeSymbol ='°'
const apiKey = 'H12Dg1UTOeRGiFfkQulgLW6CwA6oo8ey'


async function getCurrentWeather(cityKey) {
    try {
        const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}&language=en-us&details=false`);
        const data = response.data;
        return data;
    } catch (errors) {
        console.error(errors);
    }
}

async function getlocationDetails(location) {
    try {
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&language=en-us&q=${location}`);
        const data = response.data;
        return data;
    } catch (errors) {
        console.error(errors);
    }
}


async function getFiveDays(cityKey) {
    try {
        const response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&language=en-us&details=false&metric=false`);
        const data = response.data;
        return data;
    } catch (errors) {
        console.error(errors);
    }
}


function getFiveDaysAndDegreesArray(DailyForecasts) {
    let days = [];
    DailyForecasts.forEach(day => {
        days.push(
            {
                day: utilsService.getDayLettersByDate(day.Date),
                degrees:`${utilsService.fToC(((day.Temperature.Minimum.Value+day.Temperature.Maximum.Value)/2))}${degreeSymbol}c`
            }
        )
    });
return days;
}


// function getCurrentWeatherForFavoritesDisplay(favorites){
//     favorites.forEach(favorite=>{

//     })
// }