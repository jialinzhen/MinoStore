import React, {Component} from 'react';
import Input from '../../Container/FormsToRender/Input'
import {connect} from 'react-redux';
import axios from '../../axios-order';
import Spinner from '../Spinner/Spinner';

class Comments extends Component {
    state = {
        CommentForm: {
            CommentContent: {
                elementType: 'input',
                elementConfiguration: {
                    type: 'text',
                    placeholder: 'Please comment here'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            Rating: {
                elementType: 'select',
                elementConfiguration: {
                    option: [
                        {Name: "1", Display: "1"},
                        {Name: "2", Display: "2"},
                        {Name: "3", Display: "3"},
                        {Name: "4", Display: "4"},
                        {Name: "5", Display: "5"}
                    ],
                },
                value: '1',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
    },
    TotalValidity: false,
    GoodShown: '',
    NotYetReady: true,
    Goodid: null
}

componentDidMount() {
    axios.get("registerGood.json").then(response => {
        for(let item in response.data) {
            if(response.data[item].Goodid === +this.props.match.params.goodid) {
                this.setState({NotYetReady: false})
                this.setState({GoodShown: response.data[item].GoodsName})
                this.setState({Goodid: response.data[item].Goodid})
            }
        }
    })
}

inputChangedHandler =  (event, identifier) => {
    let WholeFormValid = true;
    const updatedCommentForm = {
        ...this.state.CommentForm
    };
    const updatedFormElement = {
        ...updatedCommentForm[identifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, 
        updatedFormElement.validation);
    updatedFormElement.touched = true;    
    updatedCommentForm[identifier] = updatedFormElement;

    for(let InputIdentifier in updatedCommentForm) {
        WholeFormValid = WholeFormValid && updatedCommentForm[InputIdentifier].valid;
    }

    this.setState({CommentForm: updatedCommentForm})
    this.setState({TotalValidity: WholeFormValid})
};

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

submitCommentHandler = (event) => {
    event.preventDefault();
    let commentObj = {
            userId: this.props.userId,
            Goodid: this.state.Goodid,
            content: this.state.CommentForm.CommentContent.value,
            rating: this.state.CommentForm.Rating.value
    }
    axios.post("/comments.json?auth=" + this.props.token, commentObj).
    then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error);
    });
}

render() {
    const MapFormArrayElement = [];
    for(let key in this.state.CommentForm) {
        MapFormArrayElement.push({
            id: key,
            content: this.state.CommentForm[key]
        })
    }

    let form = <Spinner/>

    if(!this.state.NotYetReady) {
        form = (
            <form onSubmit={this.submitCommentHandler}>
                <div className="center">
                    <h2>Please state Your Comment For {this.state.GoodShown}</h2>
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
                className="btn btn-primary btn-block" >
                Go Back
                </button>
            </form>
        )
    }
     
    return (
        <div>
            {form}
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, null)(Comments);