import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        const { id, title, books } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((b) => (
                                <li key={b.id}>
                                    <Book book={b} shelf={id} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf