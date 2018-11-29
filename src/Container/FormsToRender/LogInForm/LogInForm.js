import React, {Component} from 'react';
import Input from '../Input';
import {connect} from 'react-redux';
import * as actions from '../../../redux-store/actions/index'
import Spinner from '../../Spinner/Spinner'

class LogInForm extends Component {

    state = {
        LogInForm: {
            CustomerEmail: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'email',
                    placeholder: 'Enter Your Email Address'
                },
                value: ''
            },
            CustomerPassword: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: ''
            }
        }
    }

    inputChangedHandler =  (event, identifier) => {
        const updatedLogInForm = {
            ...this.state.LogInForm
        };
        const updatedFormElement = {
            ...updatedLogInForm[identifier]
        };
        updatedFormElement.value = event.target.value;
        console.log(updatedFormElement.value);
        updatedLogInForm[identifier] = updatedFormElement;
        this.setState({LogInForm: updatedLogInForm})
    };


    submitSignInHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.LogInForm.CustomerEmail.value, 
            this.state.LogInForm.CustomerPassword.value)
    }

    render() {

        const MapFormArrayElement = [];

        for(let key in this.state.LogInForm) {
            MapFormArrayElement.push({
                id: key,
                content: this.state.LogInForm[key]
            })
        }

        let form = (
            <form onSubmit={this.submitSignInHandler}>
                <div className="center">
                    <h2>LogIn</h2>
                </div>
                {
                    MapFormArrayElement.map(FormElement => {
                        return (
                            <div className="form-group">
                                <Input
                                    key={FormElement.id}
                                    elementType={FormElement.content.elementType}
                                    elementConfiguration={FormElement.content.elementConfiguration}
                                    value={FormElement.content.value}
                                    changed={(event) => this.inputChangedHandler(event, FormElement.id)}
                                />
                            </div>
                            )
                    })
                }
                <button type="submit" className="btn btn-success btn-block">Submit</button>
                <button type="button" className="btn btn-primary btn-block">Go Back</button>
            </form>
        )


        if(this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }


        return (
            <div>
                {errorMessage}
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(null, email, null, password, false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);