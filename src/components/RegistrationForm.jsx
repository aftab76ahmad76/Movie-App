import React, { useState } from 'react'
import Input from '../genralComponents/Input'

const RegistrationForm = ({history}) => {
   
    const [data, setData] = useState({ username: '', password: '', name: ''})
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errors = {}
        if (data.username.trim() === '')
            errors.username = 'Username is required.'
        if (data.password.trim() === '')
            errors.password = 'Password is required.'
        if (data.name.trim() === '')
            errors.name = 'Name is required.'
        return Object.keys(errors).length === 0 ? null : errors
    }

    const validateProperty = ({ name, value }) => {
        if (name === 'username') {
            if (value.trim() === '')
                return 'Username is required'
        }
        if (name === 'password') {
            if (value.trim() === '')
                return 'Password is required'
        }
        if (name === 'name') {
            if (value.trim() === '')
                return 'Name is required'
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate()
        console.log(errors);
        doHandleSubmit()
        history.replace('/movies')
    }

    const doHandleSubmit = () => {
        // submit to server
        console.log('Submitted');
    }

    const handleChange = ({ currentTarget: input }) => {
        const errs = { ...errors }
        const errorMessage = validateProperty(input)
        if (errorMessage) errs[input.name] = errorMessage
        else delete errs[input.name]
        const datas = { ...data }
        datas[input.name] = input.value
        setData(datas)
        setErrors(errs)
    }
    return (
        <div>
            <h1>
                {'Register'}
            </h1>
            <form onSubmit={handleSubmit}>
                <Input name='username' errors={errors.username} label='Username' value={data.username} handleChange={handleChange} />
                <Input name='password' type={'password'} errors={errors.password} label='Password' value={data.password} handleChange={handleChange} />
                <Input name='name' errors={errors.name} label='Name' value={data.name} handleChange={handleChange} />
                <button
                    className="btn btn-primary mt-4" disabled={validate()}>
                    {'Register'}
                </button>
            </form>
        </div>
    )
}

export default RegistrationForm
