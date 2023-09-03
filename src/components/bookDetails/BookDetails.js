import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Image, Header, List, Divider } from "semantic-ui-react";
import { fetchComments } from "../../redux/actions";

const BookDetails = () => {
  const { id } = useParams();
  const books = useSelector((state) => state.books.books);
  const comments = useSelector((state) => state.comments.comments); // Access comments from Redux store
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    dispatch(fetchComments()); // Dispatch the action to fetch comments
  }, [dispatch]);

  const book = books.find((book) => book.Id === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  // Function to format a date string to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="book-details-container">
      {" "}
      {/* Wrap content in a div */}
      <Container text className="text-center">
        <Header as="h1" className="large text-center">
          {book.Title}
        </Header>
        <Divider /> {/* Add a horizontal divider */}
        <Image
          src={book.CoverUrl}
          alt={book.Title}
          size="medium"
          rounded
          centered
        />
        <Divider /> {/* Add a horizontal divider */}
        <List>
          <List.Item>
            <List.Header>Author:</List.Header>
            <span className="large">{book.Author}</span>
          </List.Item>
          <Divider /> {/* Add a horizontal divider */}
          <List.Item>
            <List.Header>Language:</List.Header>
            <span className="large">{book.Language}</span>
          </List.Item>
          <Divider /> {/* Add a horizontal divider */}
          <List.Item>
            <List.Header>Publisher:</List.Header>
            <span className="large">{book.Publisher}</span>
          </List.Item>
          <Divider /> {/* Add a horizontal divider */}
          <List.Item>
            <List.Header>Year:</List.Header>
            <span className="large">{book.Year}</span>
          </List.Item>
          <Divider /> {/* Add a horizontal divider */}
          <List.Item>
            <List.Header>Pages:</List.Header>
            <span className="large">{book.Pages}</span>
          </List.Item>
        </List>
        <Divider />
        <Header as="h2">Comments:</Header>
        <List>
          {comments
            .filter((comment) => comment.BookId === book.Id)
            .map((comment) => (
              <List.Item key={comment.Id}>
                <List.Content>
                  <List.Header>{formatDate(comment.CommentedAt)}</List.Header>
                  {comment.CommentText}
                </List.Content>
              </List.Item>
            ))}
        </List>
      </Container>
    </div>
  );
};

export default BookDetails;
