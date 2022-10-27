import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authActions";
import { reset } from "../../features/auth/authSlice";
const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formError, setFormError] = useState({});

  const { user, error, success, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      handleError(message);
    }

    if (success && user) {
      navigate("/welcome");
    }

    return () => {
      dispatch(reset());
    };
  }, [error, message, user, success, navigate, dispatch]);

  const handleError = (message) => {
    // alert(message);
    // Parse the error message string
    const messageObject = JSON.parse(message);
    Object.keys(messageObject).forEach((item) => {
      changeBorderColorOnError(item);
    });

    setFormError(messageObject);
  };

  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.classList.add("error");
  };

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser(formFields));
  };
  return (
    <section className="form-container">
      <h1 className="form-heading">Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="name">
          <label>Name</label>
          <input
            placeholder="Enter your name"
            name="name"
            type="text"
            value={formFields.name}
            onChange={hanldeInputValueChange}
          />
          <span className="error-text">{formError.name}</span>
        </div>

        <div className="form-item" id="email">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            name="email"
            type="text"
            value={formFields.email}
            onChange={hanldeInputValueChange}
          />
          <span className="error-text">{formError.email}</span>
        </div>

        <div className="form-item" id="password">
          <label>Password</label>
          <input
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formFields.password}
            onChange={hanldeInputValueChange}
          />
          <span className="error-text">{formError.password}</span>
        </div>

        <div className="form-item" id="confirmPassword">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm your password"
            name="confirmPassword"
            type="password"
            value={formFields.confirmPassword}
            onChange={hanldeInputValueChange}
          />
          <span className="error-text">{formError.confirmPassword}</span>
        </div>
        <button className="form-button" type="submit">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
