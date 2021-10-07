import React, { Component } from "react";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    Searched: [],
  };
  searchChanging = async (query) => {
    if (query) {
      const books = await BooksAPI.search(query);
      let bookxs = books.map((book) => {
        if (this.props.books.some((item) => item.id === book.id)) {
          console.log("book in my shelf");
          book.shelf = this.props.books.find((x) => x.id === book.id).shelf;
        }
        return book;
      });
      this.setState(() => ({
        Searched: bookxs,
      }));
    } else {
      this.setState({ Searched: [] });
    }
  };
  ShelfUpdate = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    BooksAPI.getAll();
  };
  render() {
    const { Searched } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchChanging(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Searched.map((book) => (
              <Book
                Changing={this.Changing}
                key={book.id}
                ShelfUpdate={this.ShelfUpdate}
                book={book}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  books: PropTypes.array.isRequired,
  Changing: PropTypes.func.isRequired,
};
