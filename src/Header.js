import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8080/api/user/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:8080/api/user/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Utivest Blog
      </Link>
      <nav>
        {username && (
          <>
            <button className="button-58">
              <Link to="/create">CREATE</Link>
            </button>
            <button className="button-58" onClick={logout}>
              Logout ({username})
            </button>
          </>
        )}
        {!username && (
          <>
            <button className="button-58">
              <Link to="/login">Login</Link>
            </button>
            <button className="button-58">
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
