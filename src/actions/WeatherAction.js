
export function updateUnitType() {
    return async dispatch => {
        try {
            await dispatch(_updateUnitType());
        } catch (err) {
            console.log('WeatherAction: err in updateUnitType', err);
        }
    };
}

function _updateUnitType() {
    return {
        type: 'UPDATE_UNIT_TYPE',
    };
}



export function setGeoLocation(geoLocation) {
    return async dispatch => {
        try {
            await dispatch(_setGeoLocation(geoLocation));
        } catch (err) {
            console.log('WeatherAction: err in setGeoLocation', err);
        }
    };
}

function _setGeoLocation(geoLocation) {
    return {
        type: 'GEO_LOCATION',
        geoLocation
    };
}
