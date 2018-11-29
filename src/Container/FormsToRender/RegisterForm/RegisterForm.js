import React, {Component} from 'react';
import Input from '../Input'
import './Register.css'
import * as actions from '../../../redux-store/actions/index'
import {connect} from 'react-redux';
import Spinner from '../../Spinner/Spinner'

class CustomerForm extends Component {
    state = {
        CustomerForm: {
            CustomerName: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            CustomerImage: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'text',
                    placeholder: 'Link for Your User Page Image'
                },
                value: ''
            },
            CustomerEmail: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'email',
                    placeholder: 'Your Email Address'
                },
                value: ''
            },
            CustomerPassword: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'password',
                    placeholder: 'Please set your password'
                },
                value: ''
            }
        },
    };


    inputChangedHandler =  (event, identifier) => {
        const updatedCustomerForm = {
            ...this.state.CustomerForm
        };
        const updatedFormElement = {
            ...updatedCustomerForm[identifier]
        };
        updatedFormElement.value = event.target.value;
        updatedCustomerForm[identifier] = updatedFormElement;
        this.setState({CustomerForm: updatedCustomerForm})
    };

    submitGoodRegistrationHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.CustomerForm.CustomerName.value ,
            this.state.CustomerForm.CustomerEmail.value, 
            this.state.CustomerForm.CustomerImage.value,
            this.state.CustomerForm.CustomerPassword.value);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => { return {isSignUp: !prevState.isSignUp}});
    }

    render() {

        const MapFormArrayElement = [];

        for(let key in this.state.CustomerForm) {
            MapFormArrayElement.push({
                id: key,
                content: this.state.CustomerForm[key]
            })
        }

        let form = (
            <form onSubmit={this.submitGoodRegistrationHandler}>
                <div className="center">
                    <h2>Account Registration</h2>
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
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, image, password) => dispatch(actions.auth(name, email, image, password, true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);