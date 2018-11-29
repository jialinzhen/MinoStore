import React, {Component} from 'react'
import Spinner from '../../Spinner/Spinner';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../../../redux-store/actions/index'
import Comments from '../../Comments/Comments'; 

class Good extends Component {

    componentDidMount() {
        let Goodid = +this.props.match.params.goodid;
        this.props.onInitSingleGood(Goodid)
    }

    render() {

        let GoodObj = null;

        if(this.props.Good == null) {
            GoodObj = <Spinner/>
        } else {
            GoodObj = (
                <div>
                    <div className="jumbotron">
                        <div className="row">
                            <div className="col col-8">
                                <h1 className="display-4">{this.props.Good.GoodsName}</h1>
                                <p className="lead">Owner: {this.props.Good.OwnerName}</p>
                                <p className="lead">Price: ${this.props.Good.GoodsPrice}</p>
                                <hr className="my-4"/>
                                <p>This good belongs to : {this.props.Good.GoodsCategory}</p>
                                {
                                    this.props.isAuthenticated ?
                                    <div> 
                                        <a className="btn btn-success btn-lg" href="#" role="button">Purchase</a>
                                        <a className="btn btn-primary btn-lg" href="#" role="button">Add To Cart</a>
                                    </div>
                                    : <p>You have to sign in before you can add or purchase this item</p>
                                }
                            </div>
                            <div className="col col-4">
                        <img src={this.props.Good.GoodImage}  
                            alt={this.props.Good.GoodsName}
                            width="300px"
                            height="300px"/>
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <h3>Good Description</h3>
                        <textarea className="form-control" style={{width: "80%"}} 
                        disabled>{this.props.Good.GoodsDescription}</textarea>
                    </div>
                    <div className="form-group">
                        <h3>Comments on Goods</h3>
                            { this.props.isAuthenticated ?
                            <div>
                                <Link className="btn btn-success btn-block"
                                        to={this.props.location.pathname + "/Comment"}
                                >Add a Comment</Link>
                                <Comments  
                                good={this.props.Good} 
                                userId={this.props.userId} />
                            </div>
                            :
                            <div>
                                <Link className="btn btn-primary btn-block"
                                        to={"../Register"}
                                >Sign In To Add Comments</Link>
                                <Comments  
                                    good={this.props.Good} 
                                    userId={this.props.userId} />
                                </div>
                        }  
                    </div>
                </div>
            )
        }

        return (
            <div>
                {GoodObj}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null,
        Good: state.SingleGood.GoodShown,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitSingleGood : (id) => dispatch(actions.initSingleGood(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Good);