import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router';
import SearchPage from './component/SearchPage';
import Header from './component/Header';
import Shelves from './component/Shelves';
import SearchButton from './component/SearchButton';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    allBooks: [],
    searchBooks: [],
    error: false
  }
  async componentDidMount(){
    try{
      const books = await BooksAPI.getAll();
      this.setState({allBooks: books})
    }catch(error) {
      console.log("Sorry!! can't reach to website")
    }
  }

  updateShowSearch = (value) => {
    this.setState(({showSearchPage: value}))
  }

  onChangeShelf = (book, value) => {
    console.log("before",book.shelf)
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
      console.log("after2",book.shelf)
      this.setState(prevState => ({
        allBooks: prevState.allBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
  }

  searchOnBooks = (val) => {
    if(val.length > 0 ) {
      try{
        BooksAPI.search(val).then(books =>{
          if (books.error){
            this.setState({searchBooks:[]})
          }else
          this.setState({searchBooks:books})
        })
      }catch(error){
        console.log("sorry!!")
      }
    }
    else {
      this.setState({searchBooks:[]})
    }
  };

  resetSearchBooks = () => {
    this.setState({searchBooks:[]})
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
        <Route path="/search" render={() => (
          <SearchPage
            searchBooks={this.state.searchBooks}
            allBooks={this.state.allBooks}
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
