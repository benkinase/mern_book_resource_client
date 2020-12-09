import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/userActions";

export default function Register(props) {
  const selectedUser = useSelector((state) => state.authR);
  const { loading, user, error } = selectedUser;

  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  React.useEffect(() => {
    if (user?.token) {
      props.history.push("/");
    }
    return () => {
      //cleanup
    };
  }, [user, props.history]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newUserData = {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    };

    try {
      dispatch(register(newUserData));
      props.history.push("/login");
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <SignupContainer>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          {/* {errors && <span className="text-danger">{errors}</span>} */}
          <h4 className="text-center register">Register</h4>
          {loading && <div>Loading...</div>}
          {error && <div className="yellow-text">{error}</div>}

          <Form.Group controlId="email" bssize="large">
            <Form.Control
              autoFocus
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="username" bssize="large">
            <Form.Control
              autoFocus
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
            />
          </Form.Group>

          <button type="submit" className="secondary-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </Form>
      </div>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  form {
    width: 365px;
    margin: 4rem auto;
    padding: 30px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
    background: var(--formColor);
    color: white;
  }

  .register {
    padding-bottom: 20px;
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
`;
