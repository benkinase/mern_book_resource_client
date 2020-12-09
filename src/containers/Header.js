import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";

export default function Header() {
  let history = useHistory();
  const selectedUser = useSelector((state) => state.authR);
  const { user } = selectedUser;
  //console.log(user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/login");
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleBar = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <span>
            <img src={logo} alt="logo" />
            <span className="h5">{user?.username}</span>
          </span>
          <div className="nav-btn" onClick={toggleBar}>
            <FaAlignLeft className="nav-icon" />
          </div>
        </div>

        <ul className={isOpen ? "nav-links show-nav-links" : "nav-links"}>
          <NavLink className="nav-link" to={"/register"}>
            {!user && "Register"}
          </NavLink>
          <NavLink className="nav-link" to={"/login"}>
            {!user && "Login"}
          </NavLink>
          <NavLink className="nav-link" to={"/"}>
            {user && "Dashboard"}
          </NavLink>
          <NavLink className="nav-link" to={"/login"} onClick={handleLogout}>
            {user && "SignOut"}
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
