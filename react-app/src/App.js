import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CompanyDetails from "./components/Companies/CompanyDetails";
import PortfolioDetails from "./components/Portfolio";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/companies/:id(\d+)">
            <CompanyDetails />
          </Route>
          <Route path="/portfolio">
            {user ? <PortfolioDetails /> : <Redirect to="/login" />}
          </Route>
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  );
}

export default App;
