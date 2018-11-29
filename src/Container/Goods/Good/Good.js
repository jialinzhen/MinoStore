import React from 'react';
import { Link } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'

const Good = (props) => {
    let buttonAddToCart = null;
    let AmountFormToCart = null;
    if (props.enabledSearch) {
        if (props.canAddToCart) {
            buttonAddToCart =  
            <button className="btn btn-primary" onClick={props.Initialize}>Add to Cart</button>
        } else {
            buttonAddToCart =
            <Link className="btn btn-primary" to={'/Register'}>Sign In To Add</Link>
        }
    } else {
        buttonAddToCart = <Spinner/>
    }

    return (
        <div className="col-sm" key={props.key}>
                            <div className="card" style={{width: 18 + "rem"}}>
                                <img className="card-img-top" src={props.ImageUrl}/>
                                    <div className="card-body">
                                        <p className="card-title">{props.name}</p>
                                        <p>Current Avaliable Quantity: 
                                        {props.quantity}</p>
                                        {buttonAddToCart}
                                        <Link to={{
                                             pathname: ["Goods" + "/" + props.id]
                                         }}>
                                        <button className="btn btn-warning" type="button">
                                        View Detail</button>
                                        </Link>
                                        {AmountFormToCart}
                                 </div>
                            </div>
                        </div>
    )
}

export default Good;