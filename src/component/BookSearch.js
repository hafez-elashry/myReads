import React from 'react'

class BookSearch extends React.Component {
    render() {
        return (
            <div>
                <li>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image})`}}></div>
                        <div className="book-shelf-changer">
                            <select
                                // value={this.props.shelf}
                                onChange={(e) => this.props.onChangeShelf(this.props.book,e.target.value)}
                                defaultValue="move"
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none" selected="selected" >None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors}</div>
                    </div>
                </li>
            </div>
        )
    }
    
}

export default BookSearch
