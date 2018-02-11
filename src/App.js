import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
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
              books={books} />
          )} />
        <Route
          path='/search'
          component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
