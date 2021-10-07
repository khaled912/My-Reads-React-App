import React , {Component} from 'react'

class Book extends Component {
    state ={
        status: this.props.shelf
    };
 
   onChanging = async e => {
        const statusupdate =e.target.value;
        this.props.ShelfUpdate(this.props.book,statusupdate);
        this.setState({ statues: statusupdate});
   }
    
    render(){
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover"style={
                            !!this.props.book.imageLinks ?
                            {
                                width: 128,
                                height: 188,
                                backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
                            } : {
                                width: 128,
                                height: 188,
                                
                            }
                        }
                        />
              <div className="book-shelf-changer">
                <select  defaultValue={this.props.book.shelf ? this.props.book.shelf : "none"} onChange={this.onChanging}>

                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
      
        )
    }
  

}

export default Book