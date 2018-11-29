import React, {Component} from 'react';
import Input from '../Input'
import './GoodsForm.css'
import axios from '../../../axios-order'
import {connect} from 'react-redux';

class GoodsForm extends Component {
    state = {
        GoodForm: {
            OwnerName: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'text',
                    placeholder: 'Name of the owner'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            GoodsName: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'text',
                    placeholder: 'Name of the item'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            GoodsPrice: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'number',
                    placeholder: 'Set the price'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            GoodsQuantity: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'number',
                    placeholder: 'what amount of the good you have for sale'
                },
                value: '',
                validation: {
                    required: true,
                    NotZero: true
                },
                valid: false,
                touched: false
            },
            GoodImage: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'url',
                    placeholder: 'Product Picture URL'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            GoodsDescription: {
                elementType: 'textarea',
                elementConfiguration: {
                   placeholder: 'Describe Your Product'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            GoodsCategory: {
                elementType: 'select',
                elementConfiguration: {
                    option: [
                        {Name: "Food", Display: "FOOD"},
                        {Name: "Clothing", Display: "CLOTHING"},
                        {Name: "Utility", Display: "UTILITY"},
                        {Name: "Other", Display: "OTHER"}
                    ],
                },
                value: 'FOOD',
                validation: {
                },
                valid: true
            },
            GoodsDeliveryMethod: {
                elementType: 'select',
                elementConfiguration: {
                    option: [
                        {Name: "Fastest", Display: "SPEED-HIGHEST"},
                        {Name: "Cheapest", Display: "COST-LOWEST"}
                    ]
                },
                value: 'SPEED-HIGHEST',
                validation: {
                },
                valid: true,
                touched: false
            },
    },
    TotalValidity: false
};

    inputChangedHandler =  (event, identifier) => {
        let WholeFormValid = true;
        const updatedGoodForm = {
            ...this.state.GoodForm
        };
        const updatedFormElement = {
            ...updatedGoodForm[identifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, 
            updatedFormElement.validation);
        updatedFormElement.touched = true;    
        updatedGoodForm[identifier] = updatedFormElement;

        for(let InputIdentifier in updatedGoodForm) {
            WholeFormValid = WholeFormValid && updatedGoodForm[InputIdentifier].valid;
        }

        this.setState({GoodForm: updatedGoodForm})
        this.setState({TotalValidity: WholeFormValid})
    };

    GoBackHandler = () => {
        this.props.history.push('/Goods');
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
           isValid = isValid && value.trim() !== '';
        }
        if(rules.minlength) {
            isValid = isValid && value >= rules.minlength
        }
        if(rules.maxlength) {
            isValid = isValid && value <= rules.maxlength
        }
        if(rules.NotZero) {
            isValid = isValid && value > 0;
        }
        return isValid;
    }

    submitGoodRegistrationHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.GoodForm) {
            formData[formElementIdentifier] = 
            this.state.GoodForm[formElementIdentifier].value;
        }
        const postformData = {
            ...formData,
            userId: this.props.userId,
            Goodid: Math.random()
        }
        axios.post('/registerGood.json', 
        postformData).then(response => {
            console.log(response.data)
            this.props.history.push('/Goods');
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const MapFormArrayElement = [];
        for(let key in this.state.GoodForm) {
            MapFormArrayElement.push({
                id: key,
                content: this.state.GoodForm[key]
            })
        }
        let form = (
            <form onSubmit={this.submitGoodRegistrationHandler}>
                <div className="center">
                    <h2>Please Register Your Good Here</h2>
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
                                    Invalid={!FormElement.content.valid}
                                    touched={FormElement.content.touched}
                                />
                            </div>
                            )
                    })
                }
                <button 
                type="submit" 
                className="btn btn-success btn-block" 
                disabled={!this.state.TotalValidity}>
                Submit
                </button>
                <button 
                type="button" 
                className="btn btn-primary btn-block" 
                onClick={this.GoBackHandler}>
                Go Back
                </button>
            </form>
        )
        return (
            <div>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.auth.userId
    }
}

export default connect(mapStateToProps, null)(GoodsForm);