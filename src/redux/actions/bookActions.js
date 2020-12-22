import Swal from "sweetalert2";
import { ActionTypes } from "./ActionTypes";
import { tokenConfig } from "./authActions";
import api from "../../utils/axios";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  background: "white",
});

// list book action
const getUserBooks = (id) => async (dispatch, getState) => {
  //console.log(tokenConfig(getState));
  try {
    dispatch({ type: ActionTypes.USER_BOOK_LIST_REQUEST, payload: id });
    const { data } = await api.get(
      "/api/books/user/" + id,
      tokenConfig(getState)
    );
    dispatch({
      type: ActionTypes.USER_BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_BOOK_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};
const getAllBooks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.BOOK_LIST_REQUEST });
    const { data } = await api.get("/api/books", tokenConfig(getState));
    dispatch({
      type: ActionTypes.BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// book detail action
const getBookDetails = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.BOOK_DETAILS_REQUEST,
      payload: bookId,
    });
    const { data } = await api.get(
      "/api/books/" + bookId,
      tokenConfig(getState)
    );
    dispatch({ type: ActionTypes.BOOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// create and update book
const saveBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.BOOK_SAVE_REQUEST, payload: book });

    if (!book._id) {
      const { data } = await api.post(
        "/api/books/new",
        book,
        tokenConfig(getState)
      );
      dispatch({ type: ActionTypes.BOOK_SAVE_SUCCESS, payload: data });
      Toast.fire({
        type: "success",
        title: "Item successfully added",
      });
    } else {
      const { data } = await api.put(
        "/api/books/update/" + book._id,
        book,
        tokenConfig(getState)
      );
      dispatch({ type: ActionTypes.BOOK_SAVE_SUCCESS, payload: data });

      Toast.fire({
        type: "success",
        title: "Item successfully updated",
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_SAVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteBook = (id) => async (dispatch, getState) => {
  console.log(id);
  try {
    dispatch({ type: ActionTypes.BOOK_DELETE_REQUEST, payload: id });
    await api.delete("/api/books/" + id, tokenConfig(getState));
    dispatch({
      type: ActionTypes.BOOK_DELETE_SUCCESS,
      payload: id,
    });
    Toast.fire({
      type: "success",
      title: "Book successfully deleted",
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const toggleIsRead = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.BOOK_READ_REQUEST,
      payload: bookId,
    });
    const { data } = await api.put(
      "/api/books/isRead/" + bookId,
      tokenConfig(getState)
    );
    dispatch({ type: ActionTypes.BOOK_READ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_READ_FAIL,
      payload: error.response.data.message,
    });
  }
};

const rateBook = (bookId, rating) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.BOOK_RATING_REQUEST,
      payload: bookId,
      rating,
    });
    const { data } = await api.put(
      "/api/books/rate/" + bookId,
      rating,
      tokenConfig(getState)
    );
    console.log(data);
    dispatch({ type: ActionTypes.BOOK_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_RATING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  getAllBooks,
  getUserBooks,
  getBookDetails,
  saveBook,
  deleteBook,
  toggleIsRead,
  rateBook,
};
