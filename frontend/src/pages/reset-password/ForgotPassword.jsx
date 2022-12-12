import React, { useState, useEffect } from "react";

//REdux
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/authActions";

const ForgotPasswordPage = () => {
  const [formFields, setFormFields] = useState({ email: "" });
  const [formErrors, setFormErrors] = useState("");

  const { error, message, loading, success } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setFormErrors(message);
    }
  }, [error, message]);

  const hanldeInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // dispatch the function that sends the reset token to the email address
    dispatch(forgotPassword(formFields));
  };

  return (
    <section className="reset-password-container">
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="email">
          <label>Enter your registered email address</label>
          <input
            placeholder="Enter email"
            value={formFields.email}
            name="email"
            type="text"
            onChange={hanldeInputValueChange}
          />
        </div>
        <span className="error-text">{formErrors}</span>

        {loading ? (
          <p className="message">Please wait ...</p>
        ) : (
          <p className="message">{message.message}</p>
        )}

        <button
          type="submit"
          className="form-button "
          disabled={loading || success}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
