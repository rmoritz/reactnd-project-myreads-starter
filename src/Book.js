import React from 'react'
import PropTypes from 'prop-types'
import MoveBook from './MoveBook'

class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { book, onMoveBook } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div 
                        className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <MoveBook book={book} onMoveBook={onMoveBook} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book
