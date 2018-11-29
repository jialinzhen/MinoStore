import React from 'react'
import './Store.css'
import {NavLink} from 'react-router-dom'


const Store = () => {

        return (
            <div>
                <div id="landing-header">
                    <h1>Welcome To Our Store</h1>
                    <li className="nav-item">
                        <NavLink className="btn btn-success"
                                 to={"/Goods"}>Visit the Goods Gallery</NavLink>
                    </li>
                </div>
                    <ul className="nav justify-content-center">
                    </ul>
                    <ul className="slideshow">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
            </div>
        )
}

export default Store