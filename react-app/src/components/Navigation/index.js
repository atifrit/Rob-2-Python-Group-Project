import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./Navigation.css";
import github from "../Images/github.svg";
import logo from "../Images/canaryhoodlogo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (searchQuery.length >= 1) {
      handleSearch();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/search/companies?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      setResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error searching companies:", error);
    }
  };

  const handleResultClick = (companyId) => {
    history.push(`/companies/${companyId}`);
    setShowDropdown(false);
    setResults([]);
    setSearchQuery("");
  };

  return (
    <div className="nav-container">
      <div className="left-container">
        <div className="logo-container">
          {sessionUser ? (
            <NavLink to="/portfolio" id="landing-logo">
              <img src={logo} alt="logo" />
            </NavLink>
          ) : (
            <NavLink to="/" id="landing-logo">
              <img src={logo} alt="logo" />
            </NavLink>
          )}
        </div>
        <div className="github-links">
          <div className="github-developer">
            <a href="https://github.com/moogchoi">
              <div className="github">
                <img id="github-logo" src={github} alt=""></img>
                <div className="github-text">Mugil Choi</div>
              </div>
            </a>
            <a href="https://github.com/jondiezv">
              <div className="github">
                <img id="github-logo" src={github} alt=""></img>
                <div className="github-text">Jon Diez</div>
              </div>
            </a>
            <a href="https://github.com/atifrit">
              <div className="github">
                <img id="github-logo" src={github} alt=""></img>
                <div className="github-text">Adam Tifrit</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      {sessionUser ? (
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Enter Company Name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {showDropdown && results.length > 0 && (
            <ul className="search-results">
              {results.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="right-nav-container">
        {sessionUser ? (
          <>
            <button onClick={handleLogout} className="login">
              Logout
            </button>
            <NavLink className="signup" to="/portfolio">
              Portfolio
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="login" to="/login">
              Log in
            </NavLink>
            <NavLink className="signup" to="/signup">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
