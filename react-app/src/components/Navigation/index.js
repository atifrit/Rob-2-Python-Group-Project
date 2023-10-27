import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../Images/logo.png';
import github from '../Images/github.svg';
import { fetchStockSearch } from '../../store/companies';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const searchedStocks = useSelector((state) => state.companies.searchedStocks);
  const [searchName, setSearchName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef(null);


  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchStockSearch(searchName));
  }, [searchName]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const closeMenu = (event) => {
      if (event.target.tagName !== "INPUT") {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isFocused]);

  useEffect(() => {
    if (!isClicked) {
      return;
    }
    const closeMenu = () => {
      setIsClicked(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [isClicked]);

  return (
    <div className='nav-container'>
      <div className='left-container'>
        <div className='logo-container'>
          <NavLink to="/" id='landing-logo'>
            Robinclone <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className='github-links'>
          <div className='github-developer'>
          <a href="https://github.com/moogchoi">
            <div className='github'>
              <img
                id="github-logo"
                src={github}
                alt=""
              ></img>
            <div className='github-text'>Mugil Choi</div>
            </div>
            </a>
            <a href="https://github.com/jondiezv">
            <div className='github'>
              <img
                id="github-logo"
                src={github}
                alt=""
              ></img>
            <div className='github-text'>Jon Diez</div>
            </div>
            </a>
            <a href="https://github.com/atifrit">
            <div className='github'>
              <img
                id="github-logo"
                src={github}
                alt=""
              ></img>
            <div className='github-text'>Adam Tifrit</div>
            </div>
            </a>
          </div>
        </div>
      </div>
      <div className="home-search-bar-container">
        <div className="home-search-bar">
          <div className="home-left-search-box">
          </div>
              <input
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                  }
                }}
                ref={inputRef}
                name={
                  searchName && isFocused ? "expanded-search-bar" : "search-bar"
                }
                placeholder="Search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onClick={() => {
                  if (document.activeElement === inputRef.current) {
                    setIsFocused(true);
                  }
                }}
                autoComplete="off"
              />

          {searchName && isFocused && (
            <div className="stock-search-container">
              {searchedStocks.companies?.map((company, index) => {
                return (
                  <div key={index}>
                    <div className="search-stock-container" onClick={() => history.push(`/companies/${company.id}`)}>
                      <div className="searched-stock-symbol">
                        {company.ticker}
                      </div>
                      <div className="searched-stock-company">
                        {company.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="right-nav-container">
        {sessionUser ? (
          <><button onClick={handleLogout} className="login">
            Logout
          </button>
            <NavLink className="signup" to="/portfolio">
              Portfolio
            </NavLink></>
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
