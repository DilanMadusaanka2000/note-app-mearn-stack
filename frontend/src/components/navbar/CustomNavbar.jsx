import React from 'react';
import { useAuth } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';  // Import Link

const CustomNavbar = ({ username, setQuery }) => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="navbar bg-dark text-white p-3">Loading...</div>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#home">Notes</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li>
              <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </li>
          </ul>

          <ul className="navbar-nav ms-3">
            {!user ? (
              <>
                <li className="nav-item">
                  {/* Use Link to route to login */}
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  {/* Use Link to route to signup */}
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-3">
                    {user.name || 'Username'}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
