import * as actionTypes from '../actions/actionTypes';

const inititalState = {
    StuffInCart : []
};

const reducer = (state = inititalState, action) => {
    switch(action.type) {
        case actionTypes.SET_CART_ITEM: 
        let cartStateWithItems = [];
        let IDArray = []
        for(let item in action.CartList) {
            if(IDArray.includes(action.CartList[item].Goodid)) {
                for (let i = 0; i < cartStateWithItems.length; i++) {
                    if(cartStateWithItems[i].Goodid == action.CartList[item].Goodid) {
                        cartStateWithItems[i].quantity = cartStateWithItems[i].quantity + 
                        action.CartList[item].CurrentQuantity;
                    }
                }
            } else {
                IDArray.push(action.CartList[item].Goodid);
                cartStateWithItems.push({
                    Goodid: action.CartList[item].Goodid,
                    Imageurl: action.CartList[item].Imageurl,
                    Name: action.CartList[item].Name,
                    price: action.CartList[item].price,
                    quantity: action.CartList[item].CurrentQuantity
                })
            }
            }
            return {
                ...state,
                StuffInCart: cartStateWithItems
            }
        case actionTypes.REMOVE_CART_ITEM:
        let newCart = [
            ...action.originalCartList
        ]
        for (let i = 0; i < newCart.length; i++) {
            if(newCart[i].Goodid == action.id) {
                if(newCart[i].quantity === 1) {
                    newCart.splice(i, 1);
                } else {
                    newCart[i].quantity--;
                }
            }
        }
        return {
            ...state,
            StuffInCart: newCart
        }
        default: return state;
    }
}

export default reducer;