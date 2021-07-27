

const initialState = {
    unitType: 'c',
    geoLocation: null
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'UPDATE_UNIT_TYPE':
            return {
                ...state,
                unitType: (state.unitType === 'c') ? 'f' : 'c'
            };
        case 'GEO_LOCATION':
            return {
                ...state,
                geoLocation: action.geoLocation
            };
        default:
            return state;
    }
}
