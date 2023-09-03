import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Header, Card } from "semantic-ui-react";
import Cookies from "js-cookie";
import Book from "../book/Book";
import NoResults from "../noResult/NoResults";
import "./FavoriteBooks.css";

const FavoriteBooks = () => {
  const books = useSelector((state) => state.books.books);
  const [favoriteBooks, setFavoriteBooks] = useState([]); // State to track favorite books

  // Fetch the list of favorite book IDs from cookies
  const favoritesCookie = Cookies.get("favorites");
  const favoriteBookIds = favoritesCookie ? JSON.parse(favoritesCookie) : [];

  useEffect(() => {
    // Filter the list of books to display only favorite books
    const filteredFavoriteBooks = books.filter((book) =>
      favoriteBookIds.includes(book.Id)
    );
    setFavoriteBooks(filteredFavoriteBooks);
  }, [books, favoriteBookIds]);

  // Function to toggle favorite status (remove from favorites)
  const toggleFavorite = (bookId) => {
    const updatedFavorites = favoriteBookIds.filter((id) => id !== bookId);
    // Update favorites in cookies by stringifying it
    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 7 });

    // Update the list of favorite books by filtering out the unfavorited book
    const updatedFavoriteBooks = favoriteBooks.filter(
      (book) => book.Id !== bookId
    );
    setFavoriteBooks(updatedFavoriteBooks);
  };

  if (favoriteBooks.length === 0) {
    return (
      <NoResults
        title={"No Favorite Books"}
        text={`You haven't added any books to your favorites yet.`}
      />
    );
  }

  return (
    <div>
      <h1 className="text-center">Books</h1>
      <div className="card-container">
        {favoriteBooks.map((book) => (
          <Book
            key={book.Id}
            book={book}
            isFavorite={true}
            toggleFavorite={() => toggleFavorite(book.Id)} // Remove book from favorites
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteBooks;
