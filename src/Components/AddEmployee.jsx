import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
function AddEmployee() {
    const inputRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
   const {email} = useParams();
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
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        axios
          .post("http://localhost:8081/create", values)
          .then((res) => {
            if (res.data.status === "Success") {
              alert("Succesfully Account Created");
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
      const handleInputChange = () => {
        const query = inputRef.current.value;
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
    ):(
        <div>
                         <div className='db-header'> 
                <div className='db-top'>
                    <h2>A2Cloud</h2>
                </div>

               </div>
               <div className='db-content'>
                <div className='content-title'>
                 <p>Home / Manager</p>
                 <h5>Add Person</h5>
             </div>
             <div className="employe-contnt">
              <div className="left-emp-cnt">
             <p>  Add Employee</p>
              </div>
              <div className="right-emp-cnt">
              
           <img src="/assets/images/add-employee.png" alt="add-image" className="add-employee" />
              </div>
             </div>
             </div>
               <div className="adjust">
                <div className="img-add">
                <img
              src="/assets/images/signup.png"
              className="signup-img3"
              alt="inner file missing"
            />
                </div>
               <div className="form-container">
  <form className="form" onSubmit={handleSubmit} name="form">
    <h2>Add Employee</h2>
    <p>
      When you create an employee, their information including name, email,
      location, password, and role will be added to the database. This will
      allow employees to use their registered email and password to log in to
      the portal. As part of our commitment to data security, passwords are
      securely encrypted before being stored in the database.
    </p>
    <div className="form-group">
      <label htmlFor="inputName">Name</label>
      <input
        type="text"
        id="inputName"
        placeholder="Enter Name"
        autoComplete="off"
        name="name"
        value={values.name}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="inputEmail">Email</label>
      <input
        type="email"
        id="inputEmail"
        placeholder="Enter Email"
        autoComplete="off"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="inputPassword">Password</label>
      <input
        type="password"
        id="inputPassword"
        placeholder="Enter Password"
        autoComplete="off"
        name="password"
        value={values.password}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="inputRole">Role</label>
      <input
        type="text"
        id="inputRole"
        placeholder="Enter Role"
        autoComplete="off"
        name="role"
        value={values.role}
        onChange={handleChange}
        required
      />
    </div>
    <button type="submit" className="btn btn-primary">
      Create
    </button>
  </form>
</div>

                  {/* <div className="d-flex flex-column align-items-center pt-4">
                    <form
                      className="row g-3 w-50"
                      onSubmit={handleSubmit}
                      name="form"
                    >
                      <h2>Add Employee</h2>
                      <p>
                        When you create an employee, their information including
                        name, email, location, password, and role will be added
                        to the database. This will allow employees to use their
                        registered email and password to log in to the portal.
                        As part of our commitment to data security, passwords
                        are securely encrypted before being stored in the
                        database.
                      </p>
                      <div className="col-12">
                        <label for="inputName" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Enter Name"
                          autoComplete="off"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter Email"
                          autoComplete="off"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputPassword4" className="form-label">
                          Password
                        </label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Enter Password"
                          value={values.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputRole" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputRole"
                          placeholder="Enter Address"
                          autoComplete="off"
                          name="address"
                          ref={inputRef}
                          onChange={(e) => {
                            handleInputChange(e);
                            handleChange(e);
                          }}
                          value={values.address}
                          required
                        />
                        <ul>
                          {suggestions.map((item, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleSuggestionClick(item.display_name)
                              }
                            >
                              {item.display_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12">
                        <label for="inputAddress" className="form-label">
                          Job-Role
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="Title"
                          autoComplete="off"
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Create
                        </button>
                      </div>
                    
                    </form>
                  </div> */}
                </div>
          
        </div>
    )}
    </div>
  )
}

export default AddEmployee