import React, { useEffect, useState } from "react";
import Book from "./Book";
import { getUserBooks } from "../redux/actions/bookActions";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { saveBook } from "../redux/actions/bookActions";
import styled from "styled-components";

export default function Dashboard() {
  const selectedUser = useSelector((state) => state.authR);
  const { user } = selectedUser;
  const userBooks = useSelector((state) => state.userBooks);
  //const bookList = useSelector((state) => state.bookList);
  const { books, loading, error } = userBooks;
  //const { bookss, loading: userbooksLoading, error: userbookserror } = bookList;
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    //dispatch(getAllBooks());
    setIsMounted(true);
    isMounted && dispatch(getUserBooks(user.userId));
    //console.log(books);
    return () => {
      setIsMounted(false);
    };
  }, [isMounted, dispatch, user]);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // control modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // from store
  const bookSave = useSelector((state) => state.bookSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = bookSave;

  React.useEffect(() => {
    if (successSave) {
      handleClose();
    }
    // refresh list/page
    dispatch(getUserBooks(user.userId));
    return () => {
      //
    };
  }, [successSave, dispatch, user.userId]);

  const openModal = (book) => {
    handleShow();
    setId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setUrl(book.url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { _id: id, title, author, owner: user.userId, url };
    dispatch(saveBook(newBook));
    setTimeout(() => {
      dispatch(getUserBooks(user.userId));
    }, 5000);
  };

  const styles = {
    cardHead: { backgroundColor: "#d477b0", color: "var(--veryBlue)" },
    cardBody: { backgroundColor: "#E8E8E8" },
    cardBottom: { backgroundColor: "white" },
  };
  // create and update end
  return loading ? (
    <Spinner animation="border" role="status" className="mt-3 ml-3">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <StyledBooks>
      <div className="modal-container">
        <button className="create-book-btn" onClick={() => openModal({})}>
          +
        </button>
      </div>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton style={styles.cardHead}>
          <Modal.Title>Book</Modal.Title>
          {loadingSave && <div>Loading...</div>}
          {errorSave && <div>{errorSave}</div>}
        </Modal.Header>
        <Modal.Body style={styles.cardBody}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="url">
              <Form.Label>Url</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" bssize="large">
              <Form.Label>Author</Form.Label>
              <Form.Control
                autoFocus
                required
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={styles.cardBottom}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="info ml-2"
            type="submit"
            onClick={handleSubmit}
            className="text-blue"
          >
            {id ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="books container">
        {books?.map((book) => {
          return <Book book={book} edit={openModal} key={book._id} />;
        })}
      </div>
    </StyledBooks>
  );
}

const StyledBooks = styled.div`
  .books {
    width: 90%;
    margin: 4rem auto;
    max-width: 1170px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    place-items: center;
    gap: 1rem;
  }

  .create-book-btn {
    position: fixed;
    height: 55px;
    width: 55px;
    bottom: 1rem;
    right: 1rem;
    z-index: 100;
    padding: 0.3rem 0.8rem 0.4rem;
    outline: none;
    border-radius: 50%;
    border: none;
    background-color: #b60982;
    transition: var(--mainTransition);
    font-size: 1.5rem;
    color: #fff;
  }
  .create-book-btn:hover {
    background-color: #770655;
  }
  .create-book-btn:focus {
    outline: none;
  }
  .modal-container {
    float: right;
    margin: 1rem;
  }
`;
