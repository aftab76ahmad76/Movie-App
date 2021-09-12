import React, { useState } from 'react'
import Input from '../genralComponents/Input'

const LoginForm = ({history}) => {

    const [data, setData] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errors = {}
        if (data.username.trim() === '')
            errors.username = 'Username is required.'
        if (data.password.trim() === '')
            errors.password = 'Password is required.'
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
    }

    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate()
        console.log(errors);
        doHandleSubmit()
    }

    const doHandleSubmit = () => {
        // submit to server
        console.log('Submitted');
        history.replace('/movies')
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
                {'Login'}
            </h1>
            <form onSubmit={handleSubmit}>
                <Input name='username' errors={errors.username} label='Username' value={data.username} handleChange={handleChange} />
                <Input name='password' type={'password'} errors={errors.password} label='Password' value={data.password} handleChange={handleChange} />
                <button
                    className="btn btn-primary mt-4" disabled={validate()}>
                    {'Login'}
                </button>
            </form>
        </div>
    )
}

export default LoginForm
