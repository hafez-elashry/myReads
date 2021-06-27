import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router';

import SearchPage from './component/SearchPage';
import Header from './component/Header';
import Shelves from './component/Shelves';
import SearchButton from './component/SearchButton';
import { debounce } from 'debounce';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
    searchBooks: [],
    error: false
  }
  async componentDidMount(){
   const books = await BooksAPI.getAll();
   this.setState({allBooks: books})
   console.log("Iam Here",books)
  }

  updateShowSearch = (value) => {
    this.setState(({showSearchPage: value}))
  }

  onChangeShelf = (book, value) => {
    BooksAPI.update(book, value).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (value === 'none') {
      this.setState(prevState => ({
        allBooks: prevState.allBooks.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = value;
      this.setState(prevState => ({
        allBooks: prevState.allBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
}
  searchOnBooks = debounce((val) => {
    if(val.length > 0 ) {
      BooksAPI.search(val).then(books =>{
        if (books.error){
          this.setState({searchBooks:[]})
        }else
        this.setState({searchBooks:books})
      })  
    }else {
      this.setState({searchBooks:[]})
    }
  },10);

  resetSearchBooks = () => {
    this.setState({searchBooks:[]})
  }
  componentWillUnmount(){
    this.searchOnBooks.cancel();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=> {
          return(
            <div className="list-books">
              <Header />
              <Shelves books={this.state.allBooks} onChangeShelf={this.onChangeShelf}/>
              <SearchButton />
            </div>
          )
        }}/>
        <Route path="/search" render={ () => (
          <SearchPage
            searchBooks={this.state.searchBooks}
            onChangeShelf={this.onChangeShelf}
            onSearch={this.searchOnBooks}
            resetSearchBooks={this.resetSearchBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
