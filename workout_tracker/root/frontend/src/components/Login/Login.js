// React
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// services
import userServices from '../../services/userServices';
import login_signupServices from '../../services/login_signupServices';

// Css
import './Login.css';

// components
import Loading from '../Loading/Loading';

// Context
import { GlobalContext } from '../../context/GlobalContext';

// images
import { images } from './images';
import logo from '../../images/workout-icon.jpg';

function Login() {
  // global context
  const { user, setUser } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);

  // component states
  const [form, setForm] = useState('login');
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [backgroundImage, setBackgroundImage] = useState('');

  // Routing
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [user, navigate]);

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * 7)].img);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
    };

    // 1. login or signup a user depending on form
    // 2. call getCurrent user and setUser to user
    login_signupServices
      .login_signup(form, data)
      .then(() => {
        userServices.getCurrentUser().then((user) => setUser(user));
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data);
        setLoading(false);
      });
  };

  const changeForm = (form) => {
    setErrors({});
    setInput({
      name: '',
      email: '',
      password: '',
    });
    setForm(form);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="login-container">
      <div className="image-container">
        <img
          alt=""
          className="image-login"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      </div>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title-container">
          <img src={logo} alt="logo" className="form-image" />
          <p className="app-title">Workout Tracker</p>
        </div>
        <p className="form-title">{form === 'login' ? `Login` : `Signup`}</p>

        <div className="input-container">
          {form === 'signup' && (
            <>
              <label htmlFor="name"></label>
              <input
                onChange={(e) =>
                  setInput((prevInput) => ({
                    ...prevInput,
                    name: e.target.value,
                  }))
                }
                className="login-forms"
                type="text"
                id="fname"
                name="fname"
                placeholder="Name"
                value={input.name}
              ></input>
              {errors.name && form === 'signup' && <p className="error">{errors.name}</p>}
            </>
          )}

          <label htmlFor="email"></label>
          <input
            onChange={(e) =>
              setInput((prevInput) => ({
                ...prevInput,
                email: e.target.value,
              }))
            }
            className="login-forms"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={input.email}
          ></input>
          {errors.email && form === 'signup' && <p className="error">{errors.email}</p>}

          <label htmlFor="password"></label>
          <input
            onChange={(e) =>
              setInput((prevInput) => ({
                ...prevInput,
                password: e.target.value,
              }))
            }
            className="login-forms"
            type="password"
            placeholder="Password"
            value={input.password}
          ></input>
          {errors.password && form === 'signup' && <p className="error">{errors.password}</p>}
          {errors && form === 'login' && <p className="error">{errors.error}</p>}
          {errors && form === 'signup' && <p className="error">{errors.existing}</p>}
        </div>

        <button className="login-button">{form === 'login' ? 'Login' : 'Register'}</button>
        {form === 'login' ? (
          <div className="login-footer">
            <p>Not a member? </p>
            <p onClick={() => changeForm('signup')} className="sign-up">
              Sign up now
            </p>
          </div>
        ) : (
          <div className="login-footer">
            <p>Already a member? </p>
            <p onClick={() => changeForm('login')} className="sign-up">
              Login
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
