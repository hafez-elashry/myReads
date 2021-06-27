import React from 'react';
import Shelf from './Shelf';

class  Shelves extends React.Component {
    render() {
      const currentyReadingBooks = this.props.books.filter(book => book.shelf === "currentlyReading" );
      const wantToReadBooks = this.props.books.filter(book => book.shelf === "wantToRead");
      const readBooks = this.props.books.filter(book => book.shelf === "read");

      return (
        <div className="list-books-content">
          <div>
            <Shelf books={currentyReadingBooks} title={"Currently Reading"} onChangeShelf={this.props.onChangeShelf}/>
            <Shelf books={wantToReadBooks} title={"Want to read"} onChangeShelf={this.props.onChangeShelf}/>
            <Shelf books={readBooks} title={"read"} onChangeShelf={this.props.onChangeShelf}/>
          </div>
        </div>
    );
    }
}

export default Shelves
