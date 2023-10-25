import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="left-signup-container">
          <div className="header">Placeholder signup title</div>
          <div className="description">
          We'll need your username, email address, and a unique password. You'll use this login to access Canaryhood next time.
          </div>
          <div className="bottom-image">
            <img src={"https://cdn.robinhood.com/app_assets/odyssey/rockets.png"} />
          </div>
        </div>
        <div className="right-signup-container">
          <div className="signup-title">Create your login</div>
          <ul className="signup-errors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="signup-form-container">
            <form onSubmit={handleSubmit}>
              <div className="signup-inputs">
                <div>
                <input
                  type="text"
                  name="signup"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                </div>
              </div>
              <div className="signup-inputs">
                <div>
                <input
                  type="text"
                  name="signup"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                </div>
              </div>
              <div className="signup-inputs">
                <div>
                <input
                  type="password"
                  name="signup"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                </div>
                <div>
                <input
                  type="password"
                  name="signup"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                </div>
              </div>
              <button id="signup-submit-button" type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
