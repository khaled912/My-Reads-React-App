import React , {Component}from 'react'
import BookShelf from './BookShelf'
import { getAll, update }  from '../BooksAPI'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  };
  async componentDidMount() {
    let books = await getAll();
    await this.shelves(books); 
  }
  shelves = books => {
    const currentlyReading = books.filter(
        book => book.shelf === 'currentlyReading')
    
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')

    const read = books.filter(book => book.shelf === 'read')

    const none = books.filter(book => book.shelf === 'none')

    this.setState({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read,
        none: none
    });
};
  ShelfUpdate= async (book, shelf) => {
    await update(book, shelf);
    let booksupdate = await getAll();
    this.shelves(booksupdate);
  }
  
  


  render(){
    
  return (
    <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                    <div>
                        <BookShelf
                           Title='Currently Reading'
                           Type='currentlyReading'
                            books={this.state.currentlyReading}
                            ShelfUpdate={this.ShelfUpdate}
                        />
                        <BookShelf
                           Title='Want to Read'
                           Type='wantToRead'
                            books={this.state.wantToRead}
                            ShelfUpdate={this.ShelfUpdate}
                        />
                        <BookShelf
                           Title='Read'
                           Type='read'
                            books={this.state.read}
                            ShelfUpdate={this.ShelfUpdate}
                        />
                        
                    </div>
                </div>
                <div className='open-search'>
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}
export default MainPage;