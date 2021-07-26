

export function addFavorite(favorite) {
    return async dispatch => {
        try {
            await dispatch(_addFavorite(favorite));
        } catch (err) {
            console.log('FavoriteActions: err in addFavorite', err);
        }
    };
}

function _addFavorite(favorite) {
    return {
        type: 'ADD_FAVORITE',
        favorite
    };
}



export function removeFavorite(id) {
    return async dispatch => {
        try {
            await dispatch(_removeFavorite(id));
        } catch (err) {
            console.log('FavoriteActions: err in removeFavorite', err);
        }
    };
}

function _removeFavorite(id) {
    return {
        type: 'REMOVE_FAVORITE',
        id
    };
}


export function updatePickedFavorite(favorite) {
    return async dispatch => {
        try {
            await dispatch(_updatePickedFavorite(favorite));
        } catch (err) {
            console.log('FavoriteActions: err in updatePickedFavorite', err);
        }
    };
}

function _updatePickedFavorite(favorite) {
    return {
        type: 'PICKED_FAVORITE',
        favorite
    };
}
