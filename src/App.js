import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      //==> 2. To ensure that user remains logged in.
      //** Reason it is written inside useEffect hook, is because if written outside in the main function, it will cause re-rendering thus leading to infinite loop.
      setIsLoggedIn(true);
    }
  }, []);

  //The below function gets triggered on login button click
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); //Could've gone for cookies as well! ==> 1. to make sure user remains logged in when page reloads
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn"); //==> 3. to ensure that local storage gets cleared once we click the logout button.
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
