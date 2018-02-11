import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        const { title, books } = this.props;
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
                            id='currentlyReading' 
                            title='Currently Reading'
                            books={currentlyReading} />
                        <BookShelf 
                            id='wantToRead' 
                            title='Want to Read'
                            books={wantToRead} />
                        <BookShelf 
                            id='read' 
                            title='Read'
                            books={read} />
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