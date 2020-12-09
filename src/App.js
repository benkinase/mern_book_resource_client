import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./containers/Header";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./containers/Dashboard";
import SingleBook from "./containers/SingleBook";
import AuthRoute from "./utils/AuthRoute";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <AuthRoute exact path={"/"} component={Dashboard} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <AuthRoute exact path={"/books/:id"} component={SingleBook} />
          <Route exact path={"**"} component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
