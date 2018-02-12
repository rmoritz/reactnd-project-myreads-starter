import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { title, books, onMoveBook } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((b) => (
                                <li key={b.id}>
                                    <Book book={b} onMoveBook={onMoveBook} />
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