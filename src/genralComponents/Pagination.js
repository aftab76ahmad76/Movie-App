import React, { useState } from 'react'
import _ from 'lodash'

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage}) => {
    console.log(currentPage);
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)
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

export default Pagination
