import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import galleryGoodsReducer from "./redux-store/reducers/GalleryGoods";
import authReducer from './redux-store/reducers/auth'
import cartReducer from './redux-store/reducers/cart';
import SingleGoodReducer from './redux-store/reducers/SingleGood';
import 'react-bootstrap';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    galleryGoods: galleryGoodsReducer,
    auth: authReducer,
    cart: cartReducer,
    SingleGood: SingleGoodReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
        <Provider store={store}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
