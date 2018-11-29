import * as actionTypes from '../actions/actionTypes';

const initialState = {
    GoodShown: null
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.ON_INIT_SINGLEGOOD:
        let selectedObj = null;
        for (let item in action.GoodList) {
            if(action.GoodList[item].Goodid == action.id) {
                selectedObj = action.GoodList[item];
            }
        }
        return {
            ...state,
            GoodShown: selectedObj
        }
        default: return state;
    }
}

export default reducer;