import React, { useState, useEffect } from 'react'
import { getMovies, saveMovie } from '../services/fakeMovieService'
import Pagination from '../genralComponents/Pagination'
import paginate from '../utils/paginate'
import { getGenres } from '../services/fakeGenreService'
import GenreList from '../genralComponents/GenreList'
import MoviesTable from './MoviesTable'
import _ from 'lodash'
import { Link } from 'react-router-dom'

const Movies = () => {
    const genre = getGenres()
    const [allMovies, setAllMovies] = useState(getMovies())
    let [filteredMovies, setFilteredMovies] = useState(allMovies)
    let [searchedMovie, setSearchedMovie] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('All')
    const [sortCol, setSortCol] = useState({ path: 'title', order: 'asc' })
    const [pageSize] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)

    const handleGenre = (g) => {
        setSelectedGenre(g)
        setSearchedMovie('')
        setCurrentPage(1)
        g == 'All' ? setFilteredMovies(allMovies) : setFilteredMovies(allMovies.filter(m => m.genre.name == g.name))
    }
    const handleSearch = (text) => {
        setSearchedMovie(text)
        setSelectedGenre('All')
        setCurrentPage(1)
        setFilteredMovies(allMovies.filter(m => m.title.toLowerCase().includes(text)))
    }
    let sorted = _.orderBy(filteredMovies, [sortCol.path], [sortCol.order])
    const movies = paginate(sorted, pageSize, currentPage)
    const handleDelete = (m) => {
        setFilteredMovies(filteredMovies.filter(movie => movie._id != m._id))
        setCurrentPage(1)
    }
    const handleLike = (m) => {
        const myMovies = [...allMovies]
        const index = allMovies.indexOf(m) + 1
        myMovies[index] = { ...myMovies[index] }
        myMovies[index].liked = !myMovies[index].liked
        setAllMovies(myMovies)
    }
    const handleOnPageChange = (page) => {
        setCurrentPage(page)
    }
    const handleSort = (path) => {
        sortCol.path === path ? setSortCol({ order: sortCol.order === 'asc' ? 'desc' : 'asc' })
            : setSortCol({ path: path, order: 'desc' })
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-3">
                    <GenreList
                        handleGenre={handleGenre}
                        genres={genre}
                        selectedGenre={selectedGenre}
                    />
                </div>
                {
                    filteredMovies.length === 0 ?
                        <div className="col-9">
                            <h4>No movies to show</h4>
                        </div>
                        :
                        <div className="col-9">
                            <Link to='/movies/new'>
                                <button className='btn btn-primary mb-3'>
                                    {'New Movie'}
                                </button>
                            </Link>
                            <h4>{`Showing ${filteredMovies.length} movies in database`}</h4>
                            <input type='text' className='form-control' value={searchedMovie} onChange={e => handleSearch(e.currentTarget.value)} placeholder='Search...' />
                            <MoviesTable
                                movies={movies}
                                handleDelete={handleDelete}
                                handleLike={handleLike}
                                handleSort={handleSort} />
                            <Pagination
                                itemsCount={filteredMovies.length}
                                pageSize={pageSize}
                                onPageChange={handleOnPageChange}
                                currentPage={currentPage}
                            />
                        </div>
                }
            </div>
        </React.Fragment>
    )
}
export default Movies
