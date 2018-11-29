import React, { Component } from 'react';
import './App.css';
import Store from './Container/Store/Store'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Goods from "./Container/Goods/Goods";
import Good from "./Container/DetailPage/SingleGood/SingleGood";
import GoodForm from './Container/FormsToRender/GoodsForm/GoodsForm'
import Cart from './Container/Cart/Cart';
import RegisterForm from './Container/FormsToRender/RegisterForm/RegisterForm'
import Layout from './Container/Layout/Layout';
import Logout from './Container/FormsToRender/Logout/logout';
import * as actions from './redux-store/actions/index';
import {connect} from 'react-redux';
import Comments from './Container/Comments/CommentsForm'
import LogInForm from './Container/FormsToRender/LogInForm/LogInForm'


class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

  render() {
    
    let route = (
        <Switch>
            <Route path="/" exact component={Store}/>
            <Route path="/Goods" exact component={Goods}/>
            <Route path={"/Goods/:goodid"} exact component={Good} />
            <Route path={"/Register"} exact component={RegisterForm}/>
            <Route path={"/LogIn"} exact component={LogInForm}/>
            {/* <Redirect to={"/Goods"}/> */}
        </Switch>        
    );

    if (this.props.isAuthenticated) {
        route = (
        <Switch>
            <Route path="/" exact component={Store}/>
            <Route path="/Goods" exact component={Goods}/>
            <Route path={ "/Goods" + '/' + "Register"} exact component={GoodForm} />
            <Route path={"/Goods/:goodid/Comment"} exact component={Comments}/>
            <Route path={"/Goods/:goodid"} exact component={Good} />
            <Route path={"/Cart"} exact component={Cart}/>
            <Route path={"/Logout"} exact component={Logout}/> */}
            {/* <Route path={"/Goods/:goodid/edit"} exact component={GoodEdit}/>
            {/* <Redirect to={"/Goods"}/> */}
        </Switch>
        );
    }

        return (
        <Layout>
                <div>
                    {route}
                </div>
            </Layout>
        );
    }
}



const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp : () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
