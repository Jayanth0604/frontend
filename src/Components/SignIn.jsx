import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("employee");

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption === "employee") {
      axios
        .post("http://localhost:8081/employeeLogin", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            const email = values.email;
            navigate("/Employee-dashboard/" + email);
          } else {
            setError(res.data.Error);
          }
        })
        .catch((err) => console.log(err));
    } else if (selectedOption === "manager") {
      axios
        .post("http://localhost:8081/enter", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            const email  = values.email;
            navigate("/Manager-dashboard/"+email);
          } else {
            setError(res.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="sign-up-process">
          <h2>Sign in,</h2>
          <div className="text-danger">{error && error}</div>
          <div className="Process-Left">
            <form onSubmit={handleSubmit} className="Signup-form">
              <label className="signup-labelupdate">
                Email:
                <input
                  type="email"
                  className="signup-input"
                  name="mail"
                  onChange={(e) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label className="signup-labelupdate">
                Password:
                <input
                  onChange={(e) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      password: e.target.value,
                    }))
                  }
                  type="password"
                  className="signup-input"
                  name="password"
                  required
                />
              </label>
              <div className="Sele-Opt">
                <label>
                  <input
                    type="radio"
                    name="loginType"
                    value="manager"
                    checked={selectedOption === "manager"}
                    onChange={() => setSelectedOption("manager")}
                  />
                  Manager
                </label>
                <label>
                  <input
                    type="radio"
                    name="loginType"
                    value="employee"
                    checked={selectedOption === "employee"}
                    onChange={() => setSelectedOption("employee")}
                  />
                  Employee
                </label>
              </div>
              <label className="signup-label1">
                <input type="checkbox" required />I agree to the{" "}
                <span>
                  <Link to="/Termsandcondition-page">Terms and Conditions</Link>
                </span>{" "}
                of Service
              </label>
              <button className="signup-button" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="Process-right">
            <img
              src="assets/images/signup.png"
              className="signup-img"
              alt="inner file missing"
            />
            <p className='image-bottom-para'>
              <Link to="/Register">Create Account !</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;
