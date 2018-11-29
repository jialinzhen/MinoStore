import React from 'react';

const PurchaseSummary = (props) => {

        return (
            <div>
                {props.goods.map(product => {
                    return (
                        <div>
                            <p>{product.Name} : ${product.price}</p> 
                            <br/>
                        </div>
                    )
                })}
            </div>
        )
    }


export default PurchaseSummary;