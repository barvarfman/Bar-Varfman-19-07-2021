const initialState = {
    favorites: [],
    pickedFavorite: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.favorite]
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.id)
            };
        case 'PICKED_FAVORITE':
            return {
                ...state,
                pickedFavorite: action.favorite
            };
        default:
            return state;
    }
}
