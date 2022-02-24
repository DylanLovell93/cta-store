import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProForm = ({ userState: { admin, authkey, username } }) => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    admin,
  });

  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  const storage = window.localStorage;

  useEffect(() => {
    const getUser = async () => {
      try {
        const targetProduct = await axios.post(`${URL}/users/fetch`, {
          ...formState,
          authkey,
        });
        setFormState(targetProduct.data.payload);
      } catch (error) {
        console.warn(error);
      }
    };
    getUser();
  }, [URL]);

  const handleFormChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    formState.authkey = authkey;
    try {
      const editedUser = await axios.put(`${URL}/users`, formState);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ProForm">
      <div className="container">
        <h1>{`${username}'s Profile`}</h1>
        <form onSubmit={handleEdit}>
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={handleFormChange}
                value={formState.image}
              />
            </div>
            <div className="btnContainer mt-3">
              <button type="submit" className="btn btn-dark submitBtn">
                Edit Info
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProForm;
