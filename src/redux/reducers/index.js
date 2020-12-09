import { combineReducers } from "redux";

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";
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

  authR: userLoginReducer,
  registerR: userRegisterReducer,
  updateUserR: userUpdateReducer,
});

export default rootReducer;
