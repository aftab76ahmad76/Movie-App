import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { getMovies, saveMovie } from '../services/fakeMovieService'
import Like from '../genralComponents/Like'
import Pagination from '../genralComponents/Pagination'
const Movies = () => {
    const [movies, setMovies] = useState(getMovies())
    const [pageSize, setPageSize] = useState(4)
    const [currentPage,setCurrentPage] = useState(1)
    const handleDelete = (m) => {
        setMovies(movies.filter(movie => movie._id != m._id))
    }
    const handleLike = (m) => {
        const myMovies = [...movies]
        const index = movies.indexOf(m)
        myMovies[index] = { ...myMovies[index] }
        myMovies[index].liked = !myMovies[index].liked
        setMovies(myMovies)
    }
    const handleOnPageChange = (page) => {
       setCurrentPage(page)
    }
    if (movies.length === 0)
        return (
            <h4>No movies to show</h4>
        )
    else
        return (
            <React.Fragment>
                <h4>{`There are currently ${movies.length} in database`}</h4>
                <Table hover my-2>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(m => (
                            <tr key={m.index}>
                                <td>{m.title}</td>
                                <td>{m.genre.name}</td>
                                <td>{m.numberInStock}</td>
                                <td>{m.dailyRentalRate}</td>
                                <td><Like like={m.liked} handleLike={() => handleLike(m)} /></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(m)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    itemsCount={movies.length}
                    pageSize={pageSize}
                    onPageChange={handleOnPageChange}
                    currentPage={currentPage}
                />
            </React.Fragment>
        )
}
export default Movies
