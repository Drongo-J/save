import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Card, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Book = ({ book, isFavorite, toggleFavorite }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite); // Use local state for favorite

  // Use useEffect to update the local state when isFavorite prop changes
  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleBookClick = () => {
    navigate(`/books/${book.Id}`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(); // Toggle favorite in parent component
    setFavorite(!favorite); // Update local state
  };

  return (
    <Card className="custom-card" onClick={handleBookClick}>
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
      <Icon
        name={favorite ? 'heart' : 'heart outline'}
        color={favorite ? 'red' : 'black'}
        size="large"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite(); // Call local handler to toggle favorite
        }}
        style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }}
      />
    </Card>
  );
};

export default Book;
