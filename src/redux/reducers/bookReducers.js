import { ActionTypes } from "../actions/ActionTypes";

const initialState = { books: [] };

function bookListReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.BOOK_LIST_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.BOOK_LIST_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case ActionTypes.BOOK_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function userBookListReducer(state = { books: [] }, action) {
  //console.log(action);
  switch (action.type) {
    case ActionTypes.USER_BOOK_LIST_REQUEST:
      return { loading: true };
    case ActionTypes.USER_BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case ActionTypes.USER_BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookDetailsReducer(state = { book: {} }, action) {
  //console.log(action);
  switch (action.type) {
    case ActionTypes.BOOK_DETAILS_REQUEST:
      return { loading: true };
    case ActionTypes.BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload };
    case ActionTypes.BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookDeleteReducer(state = { books: [] }, action) {
  switch (action.type) {
    case ActionTypes.BOOK_DELETE_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.BOOK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.filter((book) => book._id !== action.payload),
        success: true,
      };
    case ActionTypes.BOOK_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookSaveReducer(state = { book: {} }, action) {
  switch (action.type) {
    case ActionTypes.BOOK_SAVE_REQUEST:
      return { loading: true };
    case ActionTypes.BOOK_SAVE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case ActionTypes.BOOK_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookReadSaveReducer(state = { books: [] }, action) {
  switch (action.type) {
    case ActionTypes.BOOK_READ_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.BOOK_READ_SUCCESS: {
      return Object.assign({}, state, {
        books: state.books.map((book) => {
          if (book._id !== action.payload._id) {
            return book;
          }
          return Object.assign({}, book, {
            isRead: !book.isRead,
          });
        }),
      });
    }
    case ActionTypes.BOOK_READ_FAIL:
      return Object.assign({}, state, {
        loading: false,
        errror: action.payload,
      });
    default:
      return state;
  }
}
function bookRatingSaveReducer(state = { book: {} }, action) {
  switch (action.type) {
    case ActionTypes.BOOK_RATING_REQUEST:
      return Object.assign({}, state, { loading: true });
    case ActionTypes.BOOK_RATING_SUCCESS:
      return Object.assign({}, state, {
        book: action.payload,
      });

    case ActionTypes.BOOK_RATING_FAIL:
      return Object.assign({}, state, {
        loading: false,
        errror: action.payload,
      });

    default:
      return state;
  }
}

export {
  bookListReducer,
  bookDetailsReducer,
  bookSaveReducer,
  bookDeleteReducer,
  bookReadSaveReducer,
  bookRatingSaveReducer,
  userBookListReducer,
};
