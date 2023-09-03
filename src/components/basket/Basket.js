import React, { useEffect, useState } from "react";
import NoResults from "../noResult/NoResults";
import Book from "../book/Book";
import Cookies from "js-cookie"; // Import Cookies

export default function Basket() {
    const [basketBooks, setBasketBooks] = useState([]); // State for books in the basket
    const [parsedFavorites, setParsedFavorites] = useState([]); // Local state for parsedFavorites
    const [forceRender, setForceRender] = useState(false);

    useEffect(() => {
        // Retrieve books from session storage when the component mounts
        const storedBooks = sessionStorage.getItem("books");
        if (storedBooks) {
            const parsedBooks = JSON.parse(storedBooks);
            setBasketBooks(parsedBooks);
        }
    }, []);

    useEffect(() => {
        // Retrieve favorites from cookies and parse it as JSON
        const favorites = Cookies.get("favorites");
        setParsedFavorites(favorites ? JSON.parse(favorites) : []);
    }, []);

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

    // Function to remove a book from the basket
    const removeFromBasket = (bookId) => {
        const updatedBasket = basketBooks.filter((book) => book.Id !== bookId);
        setBasketBooks(updatedBasket);

        // Update the session storage with the updated basket
        sessionStorage.setItem("books", JSON.stringify(updatedBasket));
    };

    return (
        <div>
            {basketBooks.length > 0 && (
                <h1 className="text-center">Books in Basket</h1>
            )}
            <div className="card-container">
                {basketBooks.length === 0 ? (
                    <NoResults
                        title={"No books in the basket."}
                        text={"You haven't added any books to your basket yet."}
                    />
                ) : (
                    basketBooks.map((book) => (
                        <Book
                            key={book.Id}
                            book={book}
                            isFavorite={parsedFavorites.includes(book.Id)}
                            toggleFavorite={() => toggleFavorite(book.Id)}
                            removeFromBasket={() => removeFromBasket(book.Id)} // Add this prop to remove the book
                            showIcon={false}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
