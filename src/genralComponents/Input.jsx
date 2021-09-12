import { rest } from 'lodash'
import React from 'react'

const Input = ({ name, label, errors, type = "text", handleChange, ...rest }) => {
    return (
        <div className="form-group">
            <label
                htmlFor={name}>
                {label}
            </label>
            <input
                {...rest}
                type={type}
                onChange={handleChange}
                name={name}
                id={name}
                className='form-control'
            />
            {
                errors
                &&
                <div className='alert alert-danger'>
                    {errors}
                </div>
            }
        </div>
    )
}

export default Input
