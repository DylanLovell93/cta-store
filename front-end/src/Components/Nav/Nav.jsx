import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Nav.css';

const Nav = ({ userState, resetPage }) => {
  const { loggedIn, authkey, username } = userState;
  const navigate = useNavigate();

  const handleLogout = () => {
    const storage = window.localStorage;
    storage.removeItem('authkey');
    alert("You've successfully been logged out!");
    navigate('/idk');
    navigate('/');
  };

  const loginButtons = (
    <>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  const logoutButtons = (
    <>
      <li>
        <Link to="/myprofile">Hi, {username}!</Link>
      </li>
      <li>
        <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </li>
    </>
  );

  return (
    <nav className="Nav">
      <Link to="/" className="navIcon">
        uShop
      </Link>
      <ul className="navList">
        <li>
          <Link to="/products">Shop</Link>
        </li>
        {loggedIn ? logoutButtons : loginButtons}
      </ul>
    </nav>
  );
};

export default Nav;
