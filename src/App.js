
import React, { useContext, useEffect, useState } from "react";
import "./App.css";

import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import { UserContext, UserProvider } from "./context/userContext";

const AppContent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loggedIn, login, logout } = useContext(UserContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log("Error:", error));
  }, []);

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1>User Authentication App</h1>

      <h2>Theme: {theme}</h2>

      <button onClick={toggleTheme}>
        Change Theme
      </button>

      <hr />

      <h2>Authentication</h2>

      {loggedIn ? (
        <>
          <p>You are logged in.</p>

          {users.length > 0 && (
            <h3>Welcome, {users[0].name}</h3>
          )}

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are logged out.</p>

          <button onClick={login}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
