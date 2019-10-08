import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Button from "../components/Button";
import { BookList, BookListItem } from "../components/BookList";
import API from "../utils/API";
import "./style.css";

class Saved extends Component {

    state = {
        savedBooks: []
    }

    componentDidMount() {
        this.loadSavedBooks();
    }

    loadSavedBooks = () => {
        API.getSavedBooks()
            .then(res =>
                this.setState({ savedBooks: res.data }))
    }

    deleteSavedBook = (event, id) => {
        event.preventDefault();
        API.deleteSavedBook(id)
          .then(res => this.loadSavedBooks())
          .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                <Row>
                    <div className="col text-center bg-info mt-4 p-2 top-section">
                        <h1>Saved React Google Books</h1>
                        <h4>Your Favorites Book</h4>
                    </div>
                </Row>
                <Row>
                    <div className="col border border-rounded p-4 mt-4 mb-4 result-section">
                        <h4><i className="fa fa-download" aria-hidden="true"></i> Saved Books</h4>
                        {!this.state.savedBooks.length ? (
                            <h6 className="text-center">No books to display currently</h6>
                        ) : (
                            <BookList>
                                {this.state.savedBooks.map(book => {
                                    return (
                                        <BookListItem
                                            key={book._id}
                                            id={book._id}
                                            title={book.title}
                                            authors={book.authors}
                                            description={book.description}
                                            thumbnail={book.thumbnail ? book.thumbnail : "https://placehold.it/128x197?text=No%20Preview"}
                                            href={book.href}
                                            saved={true}
                                            clickEvent={this.deleteSavedBook}
                                        />
                                    );
                                })}
                            </BookList>
                        )}
                    </div>
                </Row>
            </Container>
        )
    }
}

export default Saved;