import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Auth from "./services/Auth";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = Auth.getCurrentUser();

    if (user) {
      setCurrentUser(user);

    }
  }, []);

  const logOut = () => {
    Auth.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        
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
            <li className="nav-item">
              <Link to={"/UserInfo"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
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