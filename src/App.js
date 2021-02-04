import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Auth from "./services/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";
import jwt from 'jwt-decode';


const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = Auth.getCurrentUser();
    console.log('show user   --------  ',user)

    // if (user) {    ///
      setCurrentUser(user);
      console.log('show currentUser   --------  ',currentUser)
    // }

  }, []);

  const logOut = () => {
    Auth.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* from bootstrap navbar className and this also make nav-item into one line*/}
        <Link to={"/"} className="navbar-brand">
          Infinity Games Factory
        </Link>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Home"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <h1>{console.log('currentUser is : ',currentUser)}</h1>
            <li className="nav-item">
              <Link to={"/UserInfo"} className="nav-link">
                {jwt(currentUser.token).sub}
              </Link>
            </li>

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Sign out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Sign in
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div> 
          )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/Home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/UserInfo" component={UserInfo} />
        </Switch>
      </div>
    </div>

  );
};

export default App;