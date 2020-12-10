import React from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  toggleIsRead,
  getUserBooks,
} from "../redux/actions/bookActions";
import StarRating from "./StarRating";
import styled from "styled-components";

export default function Book({ book, edit }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const deleteHandler = (book) => {
    dispatch(deleteBook(book._id));
    dispatch(getUserBooks(user.id));
  };
  const toggleHandler = (book) => {
    dispatch(toggleIsRead(book._id));
    dispatch(getUserBooks(user.id));
  };

  // conditional styling
  let styles = "book";
  if (book.isRead) {
    styles = "book booked";
  }

  return (
    <StyledBook>
      <Card className={styles}>
        <Card.Body>
          <Card.Title>{book?.title.substring(0, 20)}</Card.Title>
          <Card.Subtitle>Author: {book?.author}</Card.Subtitle>
          <Card.Text>
            <StarRating value={book.rating} id={book._id} />
          </Card.Text>
          <Card.Text> {moment(book?.createdAt).fromNow()}</Card.Text>
          <hr />
          <Card.Link href={`/books/${book?._id}`}>
            {" "}
            <i className="fas fa-eye"></i>
          </Card.Link>
          <span onClick={() => edit(book)}>
            <i className="fas fa-pen ml-1"></i>
          </span>
          <span onClick={() => deleteHandler(book)}>
            <i className="fas fa-trash  ml-1"></i>
          </span>
          <span
            className=" ml-3 badge badge-primary btn"
            onClick={() => toggleHandler(book)}
          >
            {book.isRead ? "unread" : "read"}
          </span>
          <span className="rating float-right"></span>
        </Card.Body>
      </Card>
    </StyledBook>
  );
}

const StyledBook = styled.div`
  .book {
    background: #8088bd !important;
    width: 15rem;
    margin-bottom: 1rem;
    color: #f5cc14;
    border-radius: 20%;
    text-align: center;
  }
  .booked {
    background: #bfdaf5 !important;
    color: #100659;
  }
`;
