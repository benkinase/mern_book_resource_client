// handle route redirects
import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const isAuth = !!localStorage.getItem("user");
  //console.log(isAuth);

  if (isAuth) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default AuthRoute;
