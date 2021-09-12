import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage}) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pageCount + 1)
    if (pageCount === 1) return null
    return (
        <nav>
            <ul className="pagination">
                {pages.map(p => {
                    return (
                        <li key={p}
                            className={`page-item ${p == currentPage ? 'active' : ''} cursor`}>
                            <a className="page-link"
                                onClick={() => onPageChange(p)}>
                                {p}
                            </a>
                        </li>
                    )
                })
                }
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    itemsCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired,
}

export default Pagination
