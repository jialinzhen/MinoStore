import * as actionTypes from '../actions/actionTypes';

const initialState = {
    GoodsList: null,
    searching: ''
}

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.SET_GOODSLIST:
            let newList = [];
            for(let item in action.GoodsList) {
                newList.push({
                Goodid: action.GoodsList[item].Goodid,
                Name: action.GoodsList[item].GoodsName,
                price: parseInt(action.GoodsList[item].GoodsPrice),
                Imageurl: action.GoodsList[item].GoodImage,
                AvaliableQuantity: action.GoodsList[item].GoodsQuantity
                })
            }
            return {
                ...state,
                GoodsList: newList,
            };
        case actionTypes.INPUT_SEARCH: 
            return {
                ...state,
                searching: action.name
            }
        case actionTypes.START_SEARCH:
            let resultArray = []; 
            let filterList = [
                ...action.filterListTarget,
            ];
            for (let i = 0; i < filterList.length; i++) {
                if (filterList[i].Name.toLowerCase().includes(action.filterItemName.toLowerCase())) {
                    resultArray.push(filterList[i]);
                }
            }
            return {
                ...state,
                GoodsList : resultArray
            }
        case actionTypes.EDITLIST_ADD_CART:
            let newList2 = [
                ...action.oldList
            ]
            for (let i = 0; i < newList2.length; i++) {
                if (newList2[i].Goodid === action.id) {
                    newList2[i].AvaliableQuantity = 
                    newList2[i].AvaliableQuantity - action.amount;
                }
            }
            return {
                ...state,
                GoodsList: newList2
            }
            case actionTypes.CLEAR_INPUT_SEARCH: {
                return {
                    ...state,
                    searching: ''
                }
            }
        default: return state;
    }
}

export default reducer;