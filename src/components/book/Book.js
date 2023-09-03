import React, { useState, useEffect } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Book = ({ book, showIcon, setFavoriteBooks }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [inBasket, setInBasket] = useState(false);

  const [parsedFavorites, setParsedFavorites] = useState([]);

  useEffect(() => {
    const favorites = Cookies.get("favorites");
    setParsedFavorites(favorites ? JSON.parse(favorites) : []);
  }, [book.Id]);

  useEffect(() => {
    const storedBooks = sessionStorage.getItem('books');
    if (storedBooks) {
      const basket = JSON.parse(storedBooks);
      setInBasket(basket.some((item) => item.Id === book.Id));
    }
  }, [book.Id]);

  const handleBookClick = () => {
    navigate(`/books/${book.Id}`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite();
  };

  const toggleFavorite = () => {
    var bookId = book.Id;
    const updatedFavorites = [...parsedFavorites];

    if (updatedFavorites.includes(bookId)) {
      const index = updatedFavorites.indexOf(bookId);
      updatedFavorites.splice(index, 1);
      toast.success('Book Removed From Favorites!', {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
      });
    } else {
      updatedFavorites.push(bookId);
      toast.success('Book Added To Favorites!', {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
      });
    }

    setParsedFavorites(updatedFavorites);
    Cookies.set("favorites", JSON.stringify(updatedFavorites), { expires: 7 });

    // Update the favoriteBooks state
    setFavoriteBooks(updatedFavorites);
  };

  const handleToggleBasket = () => {
    if (inBasket) {
      const storedBooks = sessionStorage.getItem('books');
      if (storedBooks) {
        let basket = JSON.parse(storedBooks);
        basket = basket.filter((item) => item.Id !== book.Id);
        sessionStorage.setItem('books', JSON.stringify(basket));
        setInBasket(false);
        toast.success('Book Removed From Basket!', {
          position: "top-right",
          autoClose: 3000, // Close the toast after 3 seconds
        });
      }
    } else {
      const storedBooks = sessionStorage.getItem('books');
      let basket = storedBooks ? JSON.parse(storedBooks) : [];
      basket.push(book);
      sessionStorage.setItem('books', JSON.stringify(basket));
      setInBasket(true);
      toast.success('Book Added To Basket!', {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
      });
    }
  };

  return (
    <Card className="custom-card" onClick={handleBookClick}>
      <div style={{ position: 'relative' }}>
        {showIcon && (
          <Icon
            name={favorite ? 'heart' : 'heart outline'}
            color={favorite ? 'red' : 'black'}
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
            style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}
          />
        )}
      </div>
      <div className="custom-image-container">
        <img src={book.CoverUrl} alt={book.Title} className="custom-image" />
      </div>
      <Card.Content>
        <Card.Header className='card-title'>{book.Title}</Card.Header>
        <Card.Meta className='card-author'>{book.Author}</Card.Meta>
        <Card.Description>
          <p>Language: {book.Language}</p>
          <p>Publisher: {book.Publisher}</p>
          <p>Year: {book.Year}</p>
          <p>Pages: {book.Pages}</p>
        </Card.Description>
      </Card.Content>
      <Button
        color='teal'
        onClick={(e) => {
          e.stopPropagation();
          handleToggleBasket();
        }}
        className="custom-card-button"
      >
        {inBasket ? 'Remove from Basket' : 'Add to Basket'}
      </Button>
    </Card>
  );
};

export default Book;
