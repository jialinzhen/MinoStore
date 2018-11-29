import * as actionTypes from './actionTypes';
import axios from '../../axios-order'

export const initSingleGood = (id) => {
    return dispatch => {
        axios.get('/registerGood.json')
        .then(response => {
            dispatch(setSingleGood(response.data, id));
        })
    }
};

export const setSingleGood = ( GoodList, id ) => {
    return {
        type: actionTypes.ON_INIT_SINGLEGOOD,
        GoodList: GoodList,
        id: id
    };
};