import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/authActions";
import { reset } from "../../features/auth/authSlice";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formErrors, setFormErrors] = useState({});
  const { user, error, message, success } = useSelector((state) => state.auth);

  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleError = (message) => {
    // const messageObject = JSON.parse(message);

    // setFormErrors(messageObject);
    alert(message);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch the reset password action
    dispatch(resetPassword({ token: token, userData: formFields }));
  };
  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    if (success && user) {
      navigate("/welcome");
    }
    if (error) {
      handleError(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [success, user, error, dispatch, message, navigate]);

  return (
    <section className="reset-password-container">
      <h1 className="form-heading">Reset your password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="password">
          <label>New Password</label>
          <input
            placeholder="Enter your new password"
            value={formFields.password}
            name="password"
            type="password"
            onChange={handleInputValueChange}
          />
          <span className="error-text">{formErrors.password}</span>
        </div>
        <div className="form-item" id="confirmPassword">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm your password"
            value={formFields.confirmPassword}
            name="confirmPassword"
            type="password"
            onChange={handleInputValueChange}
          />
          <span className="error-text">{formErrors.confirmPassword}</span>
        </div>
        <button type="submit" className="form-button ">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
