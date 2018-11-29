import React, {Component} from 'react'
import "./Goods.css"
import {Link } from 'react-router-dom'
import axios from '../../axios-order';
import Spinner from '../Spinner/Spinner';
import Modal from '../Modal/Modal';
import Good from './Good/Good'
import {connect} from 'react-redux'
import * as actions from '../../redux-store/actions/index'

class Goods extends Component {

    state = {
        searching: '',
        NoMoreToAdd: false,
        cancelAddToCart: false,
        GoodFinishedFetching: true,
        readyToAdd: false,
        GoodSelectedId: null,
        AmountAdded: 0
    }

    componentDidMount() {
        this.props.onInitGoods();
    }

    AddtoCartHandler = (id) => {
        this.setState({GoodFinishedFetching: false});
        let GoodSelected = null;
        let newGoodList = null;
        for (let i = 0; i < this.props.goods.length; i++) {
            if (this.props.goods[i].Goodid == id) {
                if (this.props.goods[i].AvaliableQuantity == 0 || 
                    this.props.goods[i].AvaliableQuantity < this.state.AmountAdded) {
                    this.setState({NoMoreToAdd: true});
                } else {
                GoodSelected =  {
                    ...this.props.goods[i],
                    CurrentQuantity: this.state.AmountAdded,
                    userId: this.props.userId
                }
                newGoodList = [
                    ...this.props.goods
                ];
                newGoodList[i].AvaliableQuantity - this.state.AmountAdded;
                this.setState({GoodsList: newGoodList});
                const queryParamForSpecificUser = 'itemInCart.json?auth=' + this.props.token;
                axios.post(queryParamForSpecificUser, GoodSelected).then(response => {
                    console.log(response);
                })
                let newGoodObj = null;
                axios.get("registerGood.json").then(response => {
                    newGoodObj = response.data;
                    for(let item in newGoodObj) {
                        if(newGoodObj[item].Goodid == GoodSelected.Goodid) {
                           newGoodObj[item].GoodsQuantity =
                           newGoodObj[item].GoodsQuantity - this.state.AmountAdded;
                        }
                    }
                    axios.put("registerGood.json", newGoodObj).then(response => {
                        this.setState({GoodFinishedFetching: true})
                        this.setState({readyToAdd: false});
                        this.props.onEditGoodsListAfterAddCart(this.props.goods, id, this.state.AmountAdded);
                })
                .catch(error => {
                    console.log(error);
                })
                });
            }
        }
    }
}

    cancelAddHandler = () => {
        this.setState({NoMoreToAdd: false});
    }


    resetHandler = () => {
        this.props.onClearInputSearch();
        this.props.onInitGoods();
    }

    cancelAddingAmountHandler = () => {
        this.setState({readyToAdd: false})
        this.setState({GoodFinishedFetching: true})
    }

    startAddingAmountHandler = (id) => {
        this.setState({GoodSelectedId: id, readyToAdd: true});
    }

    AddAmountHandler = (event) => {
        this.setState({AmountAdded: parseInt(event.target.value)});
    }

    render() {
        let AllGoodRender = null;
        if (this.props.goods === null) {
            AllGoodRender = <Spinner/>;
        } else {
            AllGoodRender =
            <div className="container-fluid row">
            {   
                this.props.goods.map(good => {
                    return (
                        <Good
                            id={good.Goodid}
                            ImageUrl={good.Imageurl}
                            name={good.Name}
                            quantity={good.AvaliableQuantity}
                            enabledSearch={this.state.GoodFinishedFetching}
                            Initialize={() => this.startAddingAmountHandler(good.Goodid)}
                            canAddToCart={this.props.isAuthenticated}
                         />
                        )
                })
            }
            </div>
        }
        return (
            <div>
                <Modal
                show={this.state.readyToAdd}
                modalClosed={this.cancelAddingAmountHandler}
                >
                <form>
                    <div className="form-group">
                        <input
                        className="form-control"
                        type="number"
                        onChange={this.AddAmountHandler}
                        placeholder="Please enter the value you wish to purchase"
                        />
                        <button className="btn btn-block btn-success" type="button"
                        onClick={() => this.AddtoCartHandler
                        (this.state.GoodSelectedId)}>Confirm</button>
                    </div>
                </form>
                </Modal>
                <Modal
                show={this.state.NoMoreToAdd}
                modalClosed={this.cancelAddHandler}>
                <h1>Cannot add to it anymore</h1>
                </Modal>
                <div>
                <div className="text-center font-weight-bold">
                    Goods Gallery
                </div>
                {
                    this.props.isAuthenticated ? 
                    <Link className="btn btn-success btn-block"
                    to={this.props.match.url + '/' + "Register"}>
                    Register New Goods
                    </Link>
                    :
                    <Link className="btn btn-primary btn-block"
                    to={"Register"}>
                    Sign In Before You Wish to Register Good
                </Link>
                }
                <div>
                        <input 
                        className="form-control"
                        type="text" placeholder="Search For Goods"
                        aria-label="Search"
                        onChange={(event) => this.props.onInputSearch(event.target.value)}
                        value={this.props.searching}
                        />
                        <div className="center">
                            <button type="button" className="btn btn-success"
                            onClick={() => this.props.onStartSearch(this.props.searching, this.props.goods)}>Search</button>
                            <button type="button" className="btn btn-warning"
                            onClick={this.resetHandler}
                            disabled={this.props.searching.trim() == ''}>Clear</button>
                        </div>
                    </div>
                {AllGoodRender}
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        goods: state.galleryGoods.GoodsList,
        token: state.auth.token,
        searching: state.galleryGoods.searching,
        isAuthenticated : state.auth.token != null,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitGoods: () => dispatch(actions.initGoodsList()),
        onInputSearch: (inputSearch) => dispatch(actions.inputSearch(inputSearch)),
        onStartSearch : (searching, list) => dispatch(actions.startSearch(searching, list)),
        onEditGoodsListAfterAddCart : (oldList, id, amount) => dispatch(actions.EditGoodListAfterAddToCart(oldList, id, amount)),
        onClearInputSearch : () => dispatch(actions.clearInputSearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goods)
