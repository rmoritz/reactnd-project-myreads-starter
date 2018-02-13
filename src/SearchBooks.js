import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import SearchResults from './SearchResults'
import sortBy from 'sort-by'

class SearchBooks extends React.Component {
  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    onSearchComplete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.state = {
      books: undefined
    }
  }

  handleQueryChange(event) {
    const query = event.target.value.trim()
    const onSearchComplete = this.props.onSearchComplete

    if (query) {
      BooksAPI.search(query)
        .then((results) => {
          const books = !results || results.error ? [] : results;
          books.sort(sortBy('title'))
          this.setState({ books: onSearchComplete(books) })
        })
    }
    else {
      this.setState({ books: undefined })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time='500' handler='onChange'>
              <input autoFocus
                type="text"
                onChange={this.handleQueryChange}
                placeholder="Search by title or author" />
            </Debounce>
          </div>
        </div>
        <SearchResults
          results={this.state.books}
          onMoveBook={this.props.onMoveBook} />
      </div>
    )
  }
}

export default SearchBooks