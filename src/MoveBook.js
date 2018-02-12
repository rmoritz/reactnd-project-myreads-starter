import React from 'react'
import PropTypes from 'prop-types'

class MoveBook extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { book, onMoveBook } = this.props;
        const shelf = event.target.value

        onMoveBook(book, shelf)
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.book.shelf} onChange={this.handleChange}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default MoveBook