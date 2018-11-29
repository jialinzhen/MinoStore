import React from 'react';

const CartItem = (props) => {
    return (
        <div className="row">
                <div className="col col-2">
                    <img 
                    src={props.Imageurl} 
                    alt={props.name}
                    height="100"
                    width="100"/>
                </div>
                <div className="col col-4">
                    <h3>{props.name}</h3>
                    <h1>${props.price}</h1>
                </div>
                <div className="col col-2">
                    <button className="btn btn-danger" 
                            onClick={props.clicked}>Remove</button>
                </div>
                <div className="col col-3">
                    <h2>X {props.quantity}</h2>
                </div>
            </div>
    )
}

export default CartItem;