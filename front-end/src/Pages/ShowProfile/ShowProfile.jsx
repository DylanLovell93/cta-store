import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import ProForm from '../../Components/ProForm.jsx/ProForm';

const ShowProfile = () => {
  const [userState, setUserState] = useState({
    username: '',
    authkey: '',
    admin: false,
    loggedIn: false,
  });
  const URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const storage = window.localStorage;
        const authkey = storage.getItem('authkey');
        const getUser = await axios({
          method: 'POST',
          url: `${URL}/users/fetch`,
          data: {
            authkey,
          },
        });
        setUserState(getUser.data.payload);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, [URL]);

  return (
    <div className="ShowProfile">
      <Nav userState={userState} />
      <ProForm userState={userState} />
      <Footer />
    </div>
  );
};

export default ShowProfile;
