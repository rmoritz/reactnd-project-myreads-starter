import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { title, books, onMoveBook } = this.props;
        const currentlyReading = books.filter((b) => b.shelf === 'currentlyReading')
        const wantToRead = books.filter((b) => b.shelf === 'wantToRead')
        const read = books.filter((b) => b.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{title}</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title='Currently Reading'
                            books={currentlyReading}
                            onMoveBook={onMoveBook} />
                        <BookShelf 
                            title='Want to Read'
                            books={wantToRead}
                            onMoveBook={onMoveBook} />
                        <BookShelf 
                            title='Read'
                            books={read}
                            onMoveBook={onMoveBook} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks