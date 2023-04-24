// React
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// images
import { images } from './images';

// Css
import './Login.css';

// components
import Loading from '../Loading/Loading';

// Context
import { GlobalContext } from '../../context/GlobalContext';

// images
import logo from '../../images/workout-icon.jpg';

// const API_URL = "https://workouttracker-server.onrender.com";
const API_URL = 'http://localhost:8000';

function Login() {
  // States
  const { user } = useContext(GlobalContext);
  const { input, setInput } = useContext(GlobalContext);
  const { form, setForm } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);
  const { getCurrentUser } = useContext(GlobalContext);
  const { errors, setErrors } = useContext(GlobalContext);

  const [backgroundImage, setBackgroundImage] = useState('');

  // Routing
  const navigate = useNavigate();

  useEffect(() => {
    setBackgroundImage(images[Math.floor(Math.random() * 7)].img);
  }, []);

  useEffect(() => {
    if (user && navigate) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  let timeout;
  const setLoadingTimeout = () => {
    timeout = setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingTimeout();
    let data = {};

    if (form === 'signup') {
      data = {
        name: input.name,
        email: input.email,
        password: input.password,
      };
    } else {
      data = {
        email: input.email,
        password: input.password,
      };
    }
    axios
      .post(form === 'signup' ? `${API_URL}/api/auth/register` : `${API_URL}/api/auth/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        getCurrentUser();
        clearTimeout(timeout);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data);
        clearTimeout(timeout);
        setLoading(false);
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="login-container">
      <div className="image-container">
        <img
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
            <a onClick={() => setForm('signup')} className="sign-up">
              Sign up now
            </a>
          </div>
        ) : (
          <div className="login-footer">
            <p>Already a member? </p>
            <a onClick={() => setForm('login')} className="sign-up">
              Login
            </a>
          </div>
        )}
      </form>
    </div>
  );

  // return (
  //   <div className="login-container">
  //     <form onSubmit={(e) => handleSubmit(e)} className="form-validate">
  //       <p className="title">{form === 'login' ? `Login` : `Signup`}</p>
  //       <div className="buttons-container">
  //         <button
  //           onClick={(e) => {
  //             setForm('login');
  //             setErrors({});
  //             e.preventDefault();
  //           }}
  //           className={`loginButtons ${form === 'login' ? 'current' : ''}`}
  //         >
  //           Login
  //         </button>
  //         <button
  //           onClick={(e) => {
  //             setForm('signup');
  //             setErrors({});
  //             e.preventDefault('signup');
  //           }}
  //           className={`loginButtons ${form === 'signup' ? 'current' : ''}`}
  //         >
  //           Signup
  //         </button>
  //       </div>

  //       {form === 'signup' && (
  //         <>
  //           <label htmlFor="name"></label>
  //           <input
  //             onChange={(e) =>
  //               setInput((prevInput) => ({
  //                 ...prevInput,
  //                 name: e.target.value,
  //               }))
  //             }
  //             className="login-forms"
  //             type="text"
  //             id="fname"
  //             name="fname"
  //             placeholder="Name"
  //             value={input.name}
  //           ></input>
  //           {errors.name && form === 'signup' && <p className="error">{errors.name}</p>}
  //         </>
  //       )}

  //       <label htmlFor="email"></label>
  //       <input
  //         onChange={(e) =>
  //           setInput((prevInput) => ({
  //             ...prevInput,
  //             email: e.target.value,
  //           }))
  //         }
  //         className="login-forms"
  //         type="text"
  //         id="email"
  //         name="email"
  //         placeholder="Email"
  //         value={input.email}
  //       ></input>
  //       {errors.email && form === 'signup' && <p className="error">{errors.email}</p>}

  //       <label htmlFor="password"></label>
  //       <input
  //         onChange={(e) =>
  //           setInput((prevInput) => ({
  //             ...prevInput,
  //             password: e.target.value,
  //           }))
  //         }
  //         className="login-forms"
  //         type="password"
  //         placeholder="Password"
  //         value={input.password}
  //       ></input>
  //       {errors.password && form === 'signup' && <p className="error">{errors.password}</p>}
  //       {errors && form === 'login' && <p className="error">{errors.error}</p>}
  //       {errors && form === 'signup' && <p className="error">{errors.existing}</p>}

  //       <button className="login-button">{form === 'login' ? 'Login' : 'Register'}</button>
  //       {form === 'login' && (
  //         <div className="login-footer">
  //           <p>Not a member? </p>
  //           <a onClick={() => setForm('signup')} className="sign-up">
  //             Sign up now
  //           </a>
  //         </div>
  //       )}
  //     </form>
  //   </div>
  // );
}

export default Login;
