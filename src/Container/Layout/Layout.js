import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar'



class Layout extends Component {

    render() {

        return (
            <div>
                <NavBar />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}


export default Layout;