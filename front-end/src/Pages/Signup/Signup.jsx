import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import UserpassForm from '../../Components/UserpassForm/UserpassForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Signup = ({ newU }) => {
  const [userState, setUserState] = useState({
    username: '',
    authkey: '',
    admin: false,
    loggedIn: false,
  });
  const URL = process.env.REACT_APP_API_URL;
  const storage = window.localStorage;
  const authkey = storage.getItem('authkey');

  useEffect(() => {
    const checkLogin = async () => {
      try {
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
  }, [URL, authkey]);

  return (
    <div className="Signup">
      <Nav userState={userState} />
      <UserpassForm newU={true} userState={userState} />
      <Footer />
    </div>
  );
};

export default Signup;
