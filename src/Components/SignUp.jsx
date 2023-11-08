import React, { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Link,
} from 'react-router-dom'

function SignUp() {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });
 const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/create", values)
      .then((res) => {
        if (res.data.status === "Success") {
          navigate("/Login")
        } else {
          alert("Error in Registration. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const autoCompleteAddress = (query) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    autoCompleteAddress(query);
  };

  const handleSuggestionClick = (address) => {
    setValues((prevValues) => ({
      ...prevValues,
      address: address,
    }));
    setSuggestions([]);
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='sign-up-process'>
          <h2>SignUp,</h2>
          <div className='Process-Left'>

            <form name='form' className='Signup-form' method='POST'  onSubmit={handleSubmit}>
              <label className='signup-labelupdate'>
                Name:
                <input type="text" name="name"  className='signup-input' value={values.name}
                          onChange={handleChange}  required/>
              </label>
              <label className='signup-labelupdate'>
                Email:
                <input type="email"  name="email"  className='signup-input' value={values.email}
                          onChange={handleChange} required />
              </label>
              <label className='signup-labelupdate'>
                Password:
                <input type="password"   name="password" className='signup-input' value={values.password}
                          onChange={handleChange} required />
              </label>
              <label className='signup-labelupdate'>
                Role:
                <input type="text" name="role" value={values.role}
                          onChange={handleChange} className='signup-input' required />
              </label>
              <label className='signup-labelupdate'>
                Address:
                <input
                  type="text"
                  value={values.address}
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  ref={inputRef}
                  name="address"
                  className='signup-input'
                  required
                />
                <ul>
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(item.display_name)}
                    >
                      {item.display_name}
                    </li>
                  ))}
                </ul>
              </label>
              <label className='signup-label1'>
                <input type="checkbox" required />
                I agree to the <span><Link to="/Termsandcondition-page" >Terms and Conditions</Link></span> of Service
              </label>
              <button className='signup-button' type="submit"> Register </button>
            </form>
          </div>
          <div className='Process-right'>
            <img src='assets/images/signup(1).png' alt='inner file missing' className='signup-img' />
            <p className='image-bottom-para'><Link to="/Login">I already have an Account !</Link></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignUp