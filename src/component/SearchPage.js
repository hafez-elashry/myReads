import React from 'react'
import SearchInput from './SearchInput';

class SearchPage extends React.Component {
    render() {
      const updateBooks = this.props.searchBooks.map( book => {
        this.props.allBooks.map(bk => {
          if(book.id === bk.id){
            book.shelf = bk.shelf
          }
          return bk
        })
        return book;
      })
      return (
        <div className="search-books">
          <SearchInput onSearch={this.props.onSearch} resetSearchBooks={this.props.resetSearchBooks}/>
          <div className="search-books-results">
          <ol className="books-grid">
            {updateBooks.map(book => (
              <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf? book.shelf : "none"}
                      onChange={(e) => this.props.onChangeShelf(book, e.target.value)}
                    >
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
            ))}
          </ol>
        </div>

        </div>
      );
    }
}

export default SearchPage;