import React from 'react'
import Like from '../genralComponents/Like'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MovieForm from './MovieForm'
const MoviesTable = ({ movies, handleDelete, handleLike, handleSort }) => {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th className='cursor' onClick={() => handleSort("title")}>Title</th>
                    <th className='cursor' onClick={() => handleSort("genre.name")}>Genre</th>
                    <th className='cursor' onClick={() => handleSort("numberInStock")}>Stock</th>
                    <th className='cursor' onClick={() => handleSort("dailyRentalRate")}>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map(m => (
                    <tr key={m._id}>
                        <td><Link to={`/movieform/${m._id}`}>{m.title}</Link></td>
                        <td>{m.genre.name}</td>
                        <td>{m.numberInStock}</td>
                        <td>{m.dailyRentalRate}</td>
                        <td><Like like={m.liked} handleLike={() => handleLike(m)} /></td>
                        <td><button className='btn btn-danger' onClick={() => handleDelete(m)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default MoviesTable
