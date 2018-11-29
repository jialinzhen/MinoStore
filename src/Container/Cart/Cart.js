import React, {Component} from 'react';
import axios from '../../axios-order';
import './Cart.css';
import Modal from '../Modal/Modal'
import PurchaseSummary from '../PurchaseSummary/PurchaseSummary'
import CartItem from './CartItem/CartItem'
import {connect} from 'react-redux'
import * as actions from '../../redux-store/actions/index';

class Cart extends Component {
    
    state = {
        continueCheckout: false
    }

    componentDidMount() {

        this.props.onInitCart(this.props.token, this.props.userId);

        }

    removeHandler = (id) => {
        let newDBCartList = []
        let updateGoodList = null;
        this.props.onRemoveCartItem(this.props.StuffInCart ,id)
        
        axios.get("itemInCart.json?auth=" + this.props.token).then(response => {
            for(let item in response.data) {
                newDBCartList.push(response.data[item]);
            }
            console.log(newDBCartList);
            for(let i = 0; i < newDBCartList.length; i++) {
                if (newDBCartList[i].Goodid == id) {
                    if(newDBCartList[i].CurrentQuantity == 0) {
                        newDBCartList.splice(i, 1);
                    } else {
                        newDBCartList[i].CurrentQuantity--;
                    }
                    console.log(newDBCartList);
                    break;
                }
            }
            axios.put("itemInCart.json?auth=" + this.props.token, 
            newDBCartList).then(response => {

            })
            axios.get("registerGood.json").then(response => {
                updateGoodList = response.data;
                console.log(updateGoodList);
                for(let item in updateGoodList) {
                    if(updateGoodList[item].Goodid === id) {
                        updateGoodList[item].GoodsQuantity++;
                        console.log(updateGoodList[item].GoodsQuantity);
                    }
                }
                axios.put("registerGood.json", updateGoodList).then(response => {
                    console.log(response.data);
                })
            })
         })
    }
    
    checkOutHandler = () => {
        this.setState({continueCheckout: true});   
    }

    cancelCheckoutHandler = () => {
        this.setState({continueCheckout: false});
    }

    render() {

        let ItemsTotal = 0;
        for (let item in this.props.StuffInCart) {
            ItemsTotal = ItemsTotal + this.props.StuffInCart[item].quantity
        }
        let ItemsTotalPrice = 0;
        for(let item in this.props.StuffInCart) {
            ItemsTotalPrice = ItemsTotalPrice + this.props.StuffInCart[item].price * 
            this.props.StuffInCart[item].quantity;
        }

        return (
            <div>
                <Modal show={this.state.continueCheckout} 
                               modalClosed={this.cancelCheckoutHandler}>
                               Summary of Orders
                               <PurchaseSummary 
                               goods={this.props.StuffInCart} 
                               price={this.state.totalPrice}
                               />
                               </Modal>
                               <div>
            <h1>My Cart</h1>
            <h2>{ItemsTotal} Items in the Cart</h2>
            <div className="container-fluid">
            <div className="row">
                <div className="col col-8 scroll-auto fixedHeight">
                    {
                        this.props.StuffInCart.map(stuff => {
                            return (    
                            <CartItem
                            Imageurl={stuff.Imageurl}
                            name={stuff.Name}
                            price={stuff.price}
                            clicked={() => this.removeHandler(stuff.Goodid)}
                            quantity={stuff.quantity}
                            />
                            )
                        })
                    }
                    </div>
                    <div className="col col-3">
                        <Modal show={this.state.continueCheckout} 
                               modalClosed={this.cancelCheckoutHandler}>
                               Summary of Orders
                               <PurchaseSummary 
                               goods={this.props.StuffInCart} 
                               price={this.state.totalPrice}
                               />
                               </Modal>
                        <h1>Total Cost is : ${ItemsTotalPrice}</h1>
                        <button 
                        className="btn btn-success btn-block"
                        onClick={this.checkOutHandler}
                        disabled={this.props.StuffInCart.length == 0}
                        >
                        Checkout</button>
                    </div>
                </div>
            </div>
        </div>
            </div>
        
        )
    }
}


const mapStateToProps = state => {
    return {
        StuffInCart: state.cart.StuffInCart,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCart: (token, userId) => dispatch(actions.initGoodsCart(token, userId)),
        onRemoveCartItem: (cartList, id) => dispatch(actions.removeCartItem(cartList, id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart);