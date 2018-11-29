import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-order';
import Spinner from '../Spinner/Spinner'

class Comments extends Component {
    state = {
        CommentsForGood: null
    }

    componentDidMount() {
        let updatedComments = [];
        axios.get("comments.json?auth=" + this.props.token).then(response => {
            for (let item in response.data) {
                console.log(response.data[item]);
                console.log(this.props.good);
                if (response.data[item].Goodid === this.props.good.Goodid) {
                    if (response.data[item].userId === this.props.userId) {
                        updatedComments.push({
                            ...response.data[item],
                            Editable: true
                        })
                    } else {
                        updatedComments.push({
                            ...response.data[item],
                            Editable: false
                        })
                    }
                }
            }
            this.setState({CommentsForGood: updatedComments});
            console.log(updatedComments);
            console.log(this.state.CommentsForGood);
        })
    }

    render() {

        let Comments = null;

        if (this.state.CommentsForGood === null) {
            Comments = <Spinner/>
        } else {
            Comments = (
                this.state.CommentsForGood.map(comment => {
                    if (comment.Editable) {
                        return (
                            <div>
                                <h3>{comment.content}</h3>
                                <h6>Rating is : {comment.rating}</h6>
                                <div>
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h3>{comment.content}</h3>
                                <h6>Rating is {comment.rating}</h6>
                            </div>
                        )
                    }
                }))
            }


        return (
            <div>
                {Comments}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}

export default connect(mapStateToProps, null)(Comments);