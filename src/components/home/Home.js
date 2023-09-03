// Home.js
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/actions";
import { Button, Card, Icon } from "semantic-ui-react";
import "./Home.css";
import Book from "../book/Book";
import NoResults from "../noResult/NoResults";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books.books);
  const searchQuery = useSelector((state) => state.search.searchQuery); // Get the search query from Redux
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  const [favoriteBooks, setFavoriteBooks] = useState([]); // State to track favorite books
  const [visibleBooks, setVisibleBooks] = useState(10);
  const [loadMoreCount, setLoadMoreCount] = useState(10);

  // Fetch the list of favorite book IDs from cookies
  const favoritesCookie = Cookies.get("favorites");
  const favoriteBookIds = favoritesCookie ? JSON.parse(favoritesCookie) : [];
  useEffect(() => {
    // Filter the list of books to display only favorite books
    const filteredFavoriteBooks = allBooks.filter((book) =>
      favoriteBookIds.includes(book.Id)
    );
    setFavoriteBooks(filteredFavoriteBooks);
  }, [favoriteBookIds]); // Add favoriteBookIds as a dependency

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const loadMoreBooks = () => {
    setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + loadMoreCount);
  };

  // Filter books based on the search query
  const filteredBooks = allBooks.filter(
    (book) =>
      // You can customize this filtering logic based on your requirements
      book.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.Pages.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Conditionally render the NoResults component when there are no matching books
  if (filteredBooks.length === 0) {
    return <NoResults title={'No Results Found'} text={'Sorry, there are no books that match your search query.'} />;
  }

  return (
    <div>
      <h1 className="text-center">Books</h1>
      <div className="card-container">
        {filteredBooks.slice(0, visibleBooks).map((book) => (
          <Book
            key={book.Id}
            book={book}
            showIcon={true}
            setFavoriteBooks={() =>setFavoriteBooks}
          />
        ))}
      </div>
      {visibleBooks < filteredBooks.length && (
        <div className="button-container">
          <Button className="load-more-btn" onClick={loadMoreBooks}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
