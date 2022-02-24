import React from 'react';
import './ErrorPage.css';

const ErrorPage = ({ userState: { username, loggedIn } }) => {
  return (
    <div className="ErrorPage">
      <div className="container">
        <h1>{`Sorry${
          loggedIn ? ' ' + username : ''
        }, that page doesn't exist!`}</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
