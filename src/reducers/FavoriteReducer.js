

const initialState = {
    favorites: [
        { city: 'Tel Aviv', id: '215854', degrees: '39' },
        { city: 'Tel Aviv', id: '215854', degrees: '39' },
        { city: 'Tel Aviv', id: '215854', degrees: '39' }
    ],
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
