import React, {Component} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import axios from '../../axios-order'
import {connect} from 'react-redux'

class NavBar extends Component {

    state = {
        UserName: null,
        loadUserName: true
    }

        componentDidMount() {
            if (!this.props.isAuthenticated) {
                console.log("true");
                axios.get("User.json").then(res => {
                    for(let item in res.data) {
                        if (res.data[item].userId === this.props.userId) {
                            this.setState({UserName: res.data[item].name});
                            this.setState({loadUserName: false})
                        }
                    }
                })
            } else {
                console.log("fasle");
                console.log(this.props)
            }
        }

    render() {

        let HelloUser = null;

        if(!this.state.loadUserName) {
            HelloUser = <p>Hello {this.state.UserName}</p>
        }

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link to="/">
                    <i className="fas fa-store"></i>
                    <span className="navbar-brand">MinoStore</span>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" 
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-right" id="navbarNavAltMarkup">
                    <ul className="nav navbar-nav navbar-right">
                    <Link className="nav-item nav-link active" 
                              to={'/Goods'}>Goods Gallery</Link>
                        {!this.props.isAuthenticated ? 
                            <Link className="nav-item nav-link active"
                                to={'/LogIn'}>LogIn</Link>
                        : 
                              <Link className="nav-item nav-link active" to={'/Logout'}>Logout</Link>}
                        {!this.props.isAuthenticated ? <Link className="nav-item nav-link active" 
                              to={'/Register'}>Sign Up</Link> : null}
                        {this.props.isAuthenticated ? 
                        <Link className="nav-item nav-link active" to={'/Cart'}>My Cart</Link> : null}
                        <Link className="nav-item nav-link active" to={'/Cart'}>{HelloUser}</Link>
                    </ul>
                </div>
            </nav>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(NavBar);

