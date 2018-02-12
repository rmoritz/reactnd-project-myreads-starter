import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    onSearchComplete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.search = this.search.bind(this)
    this.state = {
      books: []
    }
  }

  search(event) {
    const query = event.target.value.trim()
    const onSearchComplete = this.props.onSearchComplete

    BooksAPI.search(query)
      .then((results) => {
        const books = !results || results.error ? [] : results;
        this.setState({ books: onSearchComplete(books) })
      })
  }

  render() {
    const { onMoveBook } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time='500' handler='onChange'>
              <input autoFocus
                type="text" 
                onChange={this.search}
                placeholder="Search by title or author" />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.books.map((b) => (
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

export default SearchBooks