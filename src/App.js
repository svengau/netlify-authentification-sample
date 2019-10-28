import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  async function fetchProfile() {
    await fetch("/.netlify/functions/auth/me").then(res =>
      res.json().then(res => setCurrentUser(res))
    );
  }

  async function fetchLogout() {
    await fetch("/.netlify/functions/auth/logout").then(setCurrentUser({}));
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {currentUser && currentUser && currentUser.id ? (
          <>
            <img src={currentUser.image} className="App-logo" alt="logo" />
            <p>Hello {currentUser.userName}</p>
            <div className="App-link" onClick={fetchLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Sample demo to show Netlify login with PassportJS</p>
            <a
              className="App-link"
              href={`/.netlify/functions/auth/google?host=${window.location.origin}`}
            >
              Login with Google
            </a>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
