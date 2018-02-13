import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { ToastContainer } from 'react-toastify'

class SearchResults extends React.Component {
    static propTypes = {
        results: PropTypes.array,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { results, onMoveBook } = this.props

        return (
            <div className="search-books-results">
                {
                    (results && results.length &&
                        <ol className="books-grid">
                            {
                                results.map((res) => (
                                    <li key={res.id}>
                                        <Book book={res} onMoveBook={onMoveBook} />
                                    </li>
                                ))
                            }
                        </ol>
                    ) 
                    || (results && <h1>No books found</h1>)
                    || (<ToastContainer />)
                }
            </div>
        )
    }
}

export default SearchResults