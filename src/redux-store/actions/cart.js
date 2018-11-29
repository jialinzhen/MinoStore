import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const setCartList = ( CartList ) => {
    return {
        type: actionTypes.SET_CART_ITEM,
        CartList: CartList
    };
};

export const removeCartItem = (originalCartList, id) => {
    return {
        type: actionTypes.REMOVE_CART_ITEM,
        originalCartList: originalCartList,
        id: id
    }
}

export const initGoodsCart = (token, userId) => {
    return dispatch => {
        axios.get('/itemInCart.json?auth=' + token + 
        '&orderBy="userId"&equalTo="' + userId + '"')
        .then(response => {
            console.log(response.data);
            dispatch(setCartList(response.data));
        })
    }
}