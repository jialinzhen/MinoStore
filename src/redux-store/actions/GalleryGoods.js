import * as actionTypes from './actionTypes';
import axios from '../../axios-order'

export const setGoodsList = ( GoodsList ) => {
    return {
        type: actionTypes.SET_GOODSLIST,
        GoodsList: GoodsList
    };
};

export const EditGoodListAfterAddToCart = (oldList, id, amount) => {
    return {
        type: actionTypes.EDITLIST_ADD_CART,
        oldList: oldList,
        id: id,
        amount: amount
    }
}

export const initGoodsList = () => {
    return dispatch => {
        axios.get('/registerGood.json')
        .then(response => {
            dispatch(setGoodsList(response.data));
        })
    }
};

export const inputSearch = (name) => {
    return {
        type: actionTypes.INPUT_SEARCH,
        name: name
    }
}

export const startSearch = (filterItemName, filterListTarget) => {
    return {
        type: actionTypes.START_SEARCH,
        filterItemName : filterItemName,
        filterListTarget: filterListTarget
    }
}

export const clearInputSearch = () => {
    return {
        type: actionTypes.CLEAR_INPUT_SEARCH
    }
}


