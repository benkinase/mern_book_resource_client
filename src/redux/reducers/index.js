import { combineReducers } from "redux";
import authReducer from "./authReducer";
import {
  bookListReducer,
  bookDetailsReducer,
  bookSaveReducer,
  bookDeleteReducer,
  bookReadSaveReducer,
  bookRatingSaveReducer,
  userBookListReducer,
} from "./bookReducers";

const rootReducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookSave: bookSaveReducer,
  bookDelete: bookDeleteReducer,
  bookRead: bookReadSaveReducer,
  bookRating: bookRatingSaveReducer,
  userBooks: userBookListReducer,

  auth: authReducer,
});

export default rootReducer;
