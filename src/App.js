import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'
import { toast } from 'react-toastify'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  constructor() {
    super()

    this.state = {
      books: undefined
    }

    this.moveBook = this.moveBook.bind(this)
    this.enhanceSearchResults = this.enhanceSearchResults.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books.sort(sortBy('title')) })
      })
      .catch(() => toast.error('Error fetching books'));
  }

  // Add shelf info to search results.
  enhanceSearchResults(results) {
    const books = this.state.books
    return results.map((r) => {
      const b = books.find((x) => x.id === r.id)
      r.shelf = b && b.shelf ? b.shelf : 'none'
      return r
    })
  }

  moveBook(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(() => {
      const existingBook = this.state.books.find((b) => b.id === book.id)
      if (existingBook) {
        // Book already in collection, so just change shelf and force render
        existingBook.shelf = shelf
        this.forceUpdate()
      }
      else {
        // Book not yet in collection, so change shelf and add it
        book.shelf = shelf
        this.setState({ books: this.state.books.concat([book]) })
      }

      // Ensure books stay sorted
      this.setState({ books: this.state.books.sort(sortBy('title')) })
    })
    .catch(() => toast.error(`Error updating book '${book.title}'`))
  }

  render() {
    const { books } = this.state;

    return (

      <div className="app">
        <Route
          exact path='/'
          render={() => (
            <ListBooks
              title='MyReads'
              books={books}
              onMoveBook={this.moveBook} />
          )} />
        <Route
          exact path='/search'
          render={() => (
            <SearchBooks
              onMoveBook={this.moveBook}
              onSearchComplete={this.enhanceSearchResults} />
          )} />
      </div>
    )
  }
}

export default BooksApp
