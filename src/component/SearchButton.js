import React from 'react'
import {Link} from 'react-router-dom'

class SearchButton extends React.Component {
    render() {
        return (
            <Link to="/search">
                <div className="open-search">
                <button>Add a book</button>
                </div>
            </Link>
            
        );
    }
}

export default SearchButton
