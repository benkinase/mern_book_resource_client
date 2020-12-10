import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components/macro";
import { login } from "../redux/actions/authActions";

export default function Login(props) {
  let history = useHistory();
  const selectedUser = useSelector((state) => state.auth);
  const { loading, user, error } = selectedUser;

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [icon, setIcon] = useState("fa fa-lock");

  useEffect(() => {
    user && history.push("/");
    return () => {};
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };
    if (!loginDetails) return false;
    dispatch(login(loginDetails));
  };

  function togglePass() {
    let pass = document.querySelector(".pass");
    if (pass.type === "password") {
      pass.type = "text";
      setIcon("fa fa-unlock");
    } else {
      pass.type = "password";
      setIcon("fa fa-lock");
    }
  }
  return (
    <LoginContainer>
      <div className="mt-3 container">
        <Form onSubmit={handleSubmit}>
          <h4 className="item-center">Login</h4>
          {loading && <div>Loading...</div>}
          {error && <div className="yellow-text">{error}</div>}
          <Form.Group controlId="email" bssize="large" className="form-item">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="form-control"
              autoFocus
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label>Password</Form.Label>
            <div className="passContainer">
              <Form.Control
                className="form-control pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <i className={icon} onClick={togglePass} aria-hidden="true"></i>
            </div>
          </Form.Group>
          <div className="button-container">
            <button type="submit" className="secondary-btn">
              {loading ? "login in..." : "Login"}
            </button>
          </div>
        </Form>
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  form {
    width: 365px;
    margin: 4rem auto;
    padding: 30px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
    background: var(--formColor);
    color: white;
  }
  /* form btns*/
  .secondary-btn {
    width: 19.1rem;
    height: 2.5rem;
    background: var(--mainYellow);
    border: 1px solid var(--secYellow);
    outline-width: none;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 0.5rem;
    outline: var(--mainYellow);
    color: var(--veryBlue);
    letter-spacing: var(--mainSpacing);
    outline: none;
    border-color: var(--mainYellow);
  }
  .secondary-btn:hover {
    transition: var(--mainTransition);
    background: var(--secYellow);
    cursor: pointer;
  }
  .secondary-btn:focus {
    outline: none;
  }
  .form-control:focus {
    background: var(--offWhite);
    outline: none;
    color: red;
  }
  .passContainer {
    position: relative;
    display: flex;
  }
  .fa-lock,
  .fa-unlock {
    position: absolute;
    right: 5px;
    top: 12px;
    color: var(--veryBlue);
  }
  .fa-lock:hover,
  .fa-unlock:hover {
    cursor: pointer;
  }
`;
