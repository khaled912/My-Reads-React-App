import React from 'react';
import Book from './Book';



const BookShelf = props => {
    return(
    <div className='bookshelf'>
    <h2 className='bookshelf-title'>{props.Title}</h2>
    <div className='bookshelf-books'>
   <ol className='books-grid'>
       {props.books
           ? props.books.map((book, ID) => {
               return (
                   <li key={ID}>
                       <Book book={book} shelf={book.shelf} ShelfUpdate={props.ShelfUpdate} />
                   </li>
               ); })
           : ''}
   </ol>
    </div>
  </div>)
}

export default BookShelf;