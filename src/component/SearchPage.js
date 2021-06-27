import React from 'react'
import BookSearch from './BookSearch'
import SearchInput from './SearchInput';

class SearchPage extends React.Component {
    render() {
        return (
            <div className="search-books">
                <SearchInput onSearch={this.props.onSearch} resetSearchBooks={this.props.resetSearchBooks}/>
              <div className="search-books-results">
                <ol className="books-grid">
                  {this.props.searchBooks.map(bk => (
                    <BookSearch
                      key={bk.id}
                      image={bk.imageLinks.smallThumbnail}
                      book={bk}
                      onChangeShelf={this.props.onChangeShelf}
                      title={bk.title}
                      authors={bk.authors}
                    />
                  ))}
                </ol>
              </div>
          </div>
        );
    }
}

export default SearchPage;