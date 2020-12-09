import React from "react";
import { Row, Col } from "react-bootstrap";
import { getBookDetails } from "../redux/actions/bookActions";
import { useSelector, useDispatch } from "react-redux";

export default function SingleBook(props) {
  //get book details
  const bookDetails = useSelector((state) => state.bookDetails);
  const { book, loading, error } = bookDetails;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBookDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className="card shadow-sm container mt-5 ">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row className="container">
          <Col className="mt-4">
            <p> Resource title: {book.title}</p>
          </Col>
          <Col>
            <p>Stored resource url</p>
            <p>
              <em className="red-text">{book.url}</em>
            </p>
          </Col>
        </Row>
      )}
    </div>
  );
}
