import Swal from "sweetalert2";
import { ActionTypes } from "./ActionTypes";
import api from "../../utils/axios";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  background: "green",
});

// list book action
const getUserBooks = (id) => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.USER_BOOK_LIST_REQUEST, id });
    const { data } = await api.get("/api/books/user/" + id);
    //console.log(data);
    dispatch({
      type: ActionTypes.USER_BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_BOOK_LIST_FAIL,
      payload: error.message,
    });
  }
};
const getAllBooks = () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.BOOK_LIST_REQUEST });
    const { data } = await api.get("/api/books");
    dispatch({
      type: ActionTypes.BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_LIST_FAIL,
      payload: error.message,
    });
  }
};

// book detail action
const getBookDetails = (bookId) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.BOOK_DETAILS_REQUEST,
      payload: bookId,
    });
    const { data } = await api.get("/api/books/" + bookId);
    console.log(data);
    dispatch({ type: ActionTypes.BOOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// create and update book
const saveBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.BOOK_SAVE_REQUEST, payload: book });

    if (!book._id) {
      const { data } = await api.post("/api/books/new", book);
      dispatch({ type: ActionTypes.BOOK_SAVE_SUCCESS, payload: data });
      Toast.fire({
        type: "success",
        title: "Item successfully added",
      });
    } else {
      const { data } = await api.put("/api/books/update/" + book._id, book);
      dispatch({ type: ActionTypes.BOOK_SAVE_SUCCESS, payload: data });
      setTimeout(() => {
        window.location.reload(false);
      }, 50);
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

const deleteBook = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.BOOK_DELETE_REQUEST, payload: bookId });

    const result = Swal.fire({
      height: 100,
      title: `Sure to delete this item?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#38778e",
      cancelButtonColor: "#f10e8f",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const { data } = await api.delete("/api/books/delete/" + bookId);
      dispatch({
        type: ActionTypes.BOOK_DELETE_SUCCESS,
        payload: data,
        success: true,
      });
      Toast.fire({
        type: "success",
        title: "Book successfully deleted",
      });
    }
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
    const { data } = await api.put("/api/books/update/read/" + bookId);
    dispatch({ type: ActionTypes.BOOK_READ_SUCCESS, payload: data });
    setTimeout(() => {
      window.location.reload(false);
    }, 50);
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_READ_FAIL,
      payload: error.message,
    });
  }
};

const rateBook = (bookId, rating) => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.BOOK_RATING_REQUEST,
      payload: bookId,
      rating,
    });
    dispatch({ type: ActionTypes.BOOK_RATING_SUCCESS, payload: rating });
    window.location.replace("/");
    await api.put("/api/books/update/rate/" + bookId, rating);
  } catch (error) {
    dispatch({
      type: ActionTypes.BOOK_RATING_FAIL,
      payload: error.message,
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
