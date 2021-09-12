import React, { useState, useEffect } from 'react'
import Input from '../genralComponents/Input'
import { saveMovie, getMovie } from '../services/fakeMovieService'
import * as genresAPI from "../services/fakeGenreService";

const MovieForm = ({ history, match }) => {
    const [selectedMovie, setSelectedMovie] = useState(getMovie(match.params.id))
    const [data, setData] = useState({ title: '', genre: '', numberInStock: '', dailyRentalRate: '' })
    const [newMovieData,setNewMovieData] = useState()
    useEffect(() => {
        if (!selectedMovie) return history.replace('/not-found')
        setNewMovieData({
            _id: selectedMovie._id,
            title: data.title,
            genreId: genresAPI.genres.find(g => g.name === data.genre) ? genresAPI.genres.find(g => g.name === data.genre)._id : '',
            numberInStock: parseInt(data.numberInStock),
            dailyRentalRate: parseInt(data.dailyRentalRate),
        })
        setData({ title: selectedMovie.title, genre: selectedMovie.genre.name, numberInStock: selectedMovie.numberInStock, dailyRentalRate: selectedMovie.dailyRentalRate })
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errors = {}
        if (data.title.trim() === '')
            errors.title = 'Title is required.'
        if (data.genre.trim() === '')
            errors.genre = 'Genre is required.'
        if (!(data.genre.trim() === 'Action' || data.genre.trim() === 'Comedy' || data.genre.trim() === 'Thriller'))
            errors.genre = 'Genre is invalid'
        if (data.numberInStock.toString().trim() === '')
            errors.numberInStock = 'No in Stock is required.'
        if (data.dailyRentalRate.toString().trim() === '')
            errors.numberInStock = 'dailyRentalRate is required.'
        if (data.numberInStock > 100)
            return 'No in Stock should be less then 100.'
        if (data.numberInStock < 0)
            return 'No in Stock can not be less then 0.'
        if (data.dailyRentalRate > 10)
            return 'No in Stock should be less then 10.'
        if (data.dailyRentalRate < 0)
            return 'No in Stock can not be less then 0.'
        return Object.keys(errors).length === 0 ? null : errors
    }

    const validateProperty = ({ name, value }) => {
        if (name === 'title') {
            if (value.trim() === '')
                return 'Title is required'
        }
        if (name === 'genre') {
            if (value.trim() === '')
                return 'Genre is required'
            if (!(value.trim() === 'Action' || value.trim() === 'Comedy' || value.trim() === 'Thriller'))
                return 'Genre is invalid'
        }
        if (name === 'numberInStock') {
            if (value.toString().trim() === '')
                return 'No in Stock is required'
            if (value > 100)
                return 'No in Stock should be less then 100.'
            if (value < 0)
                return 'No in Stock can not be less then 0.'
        }
        if (name === 'dailyRentalRate') {
            if (value.toString().trim() === '')
                return 'dailyRentalRate is required'
            if (value > 10)
                return 'No in Stock should be less then 10.'
            if (value < 0)
                return 'No in Stock can not be less then 0.'
        }
    }


    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate()
        //submit to server
        saveMovie(newMovieData)
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
                {`Movie Form`}
            </h1>
            <form onSubmit={handleSubmit}>
                <Input name='title' errors={errors.title} label='Title' value={data.title} handleChange={handleChange} />
                <Input name='genre' autocomplete='off' errors={errors.genre} list='genrelist' label='Genre' value={data.genre} handleChange={handleChange} />
                <datalist id="genrelist">
                    <option value="Action" />
                    <option value="Thriller" />
                    <option value="Comedy" />
                </datalist>
                <Input name='numberInStock' type='number' errors={errors.numberInStock} label='Number in Stock' value={data.numberInStock} handleChange={handleChange} />
                <Input name='dailyRentalRate' type='number' errors={errors.dailyRentalRate} label='Rate' value={data.dailyRentalRate} handleChange={handleChange} />
                <button
                    className="btn btn-primary mt-4"
                    disabled={validate()}
                >
                    {'Save'}
                </button>
            </form>
        </div>
    )
}

export default MovieForm