import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search'
import MainPage from  './components/MainPage'
import { Route } from 'react-router-dom';



class BooksApp extends React.Component {
  state = {
  books:[],
  
  }
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({
      books: books
    });
  }
  
  Changing = async (book, shelf) => {

    this.setState({ loading: true })
    await BooksAPI.update(book, shelf).then(res => {
      var found = false
      for (let i = 0; i < this.state.books.length; i++) {
        if (this.state.books[i].id === book.id) {
          found = true
          break
        }
      }
      if (found) {
        this.setState({
         
          books: this.state.books.map(Book => {
            if (Book.id === book.id) {
              Book.shelf = shelf
            }
            return Book;
          })
        })
      }
      else {
        book.shelf = shelf
        this.setState({
         
          books: [...this.state.books, book]
        })
      }

    })
  }


  render() {
    
    return (
      <div className='app'>
        <Route
          exact  path='/'
          render={() => <MainPage books={this.state.books} />}
          />
        <Route
          path='/search'
          render={() => <Search Changing={this.Changing}  books={this.state.books} />}
          />
      </div>
    );
  }
}

export default BooksApp
