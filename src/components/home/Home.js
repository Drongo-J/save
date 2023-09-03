// Home.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/actions";
import { Button, Card, Icon } from "semantic-ui-react";
import Cookies from "js-cookie";
import "./Home.css";
import Book from "../book/Book";
import NoResults from "../noResult/NoResults";

export default function Home() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books.books);
  const searchQuery = useSelector((state) => state.search.searchQuery); // Get the search query from Redux
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  const [visibleBooks, setVisibleBooks] = useState(10);
  const [loadMoreCount, setLoadMoreCount] = useState(10);

  const [parsedFavorites, setParsedFavorites] = useState([]); // Local state for parsedFavorites

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    // Get favorites from cookies and parse it as JSON
    const favorites = Cookies.get("favorites");
    setParsedFavorites(favorites ? JSON.parse(favorites) : []);
  }, []);

  const loadMoreBooks = () => {
    setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + loadMoreCount);
  };

  const toggleFavorite = (bookId) => {
    const updatedFavorites = [...parsedFavorites];

    if (updatedFavorites.includes(bookId)) {
      const index = updatedFavorites.indexOf(bookId);
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(bookId);
    }

    // Update favorites in cookies by stringifying it
    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 7 });

    // Force a re-render to update the heart icon
    setForceRender(!forceRender);
  };

  const [forceRender, setForceRender] = useState(false);

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
            isFavorite={parsedFavorites.includes(book.Id)}
            toggleFavorite={() => toggleFavorite(book.Id)}
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
