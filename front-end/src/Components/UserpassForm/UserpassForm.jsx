import './UserpassForm.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UserpassForm = ({ newU }) => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  const handleFormChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await axios({
        method: 'POST',
        url: `${URL}/users/login`,
        data: formState,
      });
      alert('success!');
      const storage = window.localStorage;
      storage.setItem('authkey', user.data.payload.authkey);
      const testUser = storage.getItem('user');
      navigate('/products/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const newUser = await axios.post(`${URL}/users/`, formState);
      alert('Success!! Go sign in!');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UserpassForm">
      <div className="container">
        <h1>{newU ? 'Sign-up' : 'Login'}</h1>
        <form onSubmit={newU ? handleSignup : handleLogin}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                onChange={handleFormChange}
                value={formState.username}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={handleFormChange}
                value={formState.password}
              />
            </div>
          </div>
          <div className="btnContainer mt-3">
            <Link to="/products" className="btn btn-dark backBtn">
              Back
            </Link>
            <button type="submit" className="btn btn-dark submitBtn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserpassForm;
