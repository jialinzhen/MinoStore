import React from 'react'
import './Input.css'
const Input = (props) => {

    let inputElement = null;

    let style = null;
    let validationError = null;
    if (props.Invalid && props.touched) {
        style = {
            border: '2px solid red'
        }
        validationError = <p className='error'>Please enter a valid {props.elementType}</p>
    }
    switch(props.elementType) {
        case("textarea"):
            inputElement = <textarea
                {...props.elementConfiguration}
                value={props.value}
                onChange={props.changed}
                className="form-control"
                style={style}
            />
            break;
        case('select'):
            inputElement = <select className="form-control"
                                   value={props.value}
                                   onChange={props.changed}
                                   {...props.elementConfiguration}
                                   style={style}
                                    >
                {
                    props.elementConfiguration.option.map(op => {
                        return <option key={op.Name} value={op.Name}>{op.Display}</option>
                    })
                }
            </select>;
            break;
        default:
            inputElement = <input {...props.elementConfiguration}
                                  className="form-control"
                                  value={props.value}
                                  onChange={props.changed}
                                  style={style}
                                  />
    }
    return (
        <div>
            {inputElement}
            {validationError}
        </div>
    )

};

export default Input;