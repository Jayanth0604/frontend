import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function AddManager() {
  const [manager, setManager] = useState({});
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/createmanager", values)
      .then((res) => {
        if (res.data.status === "Success") {
          const email = values.email;
          alert("Account Created")
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
  useEffect(() => {
    axios.get(`http://localhost:8081/manager/${email}`)
      .then((res) => setManager(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <div >
      {isLoading ? (
        <Loader />
      ) : (
        <div >
                    <div className='db-header'>
            <div className='db-top'>
            <h2>A2Cloud</h2>
              
            </div>
            <div className='dp-top-img'>
            
              <img src={`http://localhost:8081/images/` + manager.image} className="logoff-image" />

            </div>
            <div className='Nav-bar-header'>
              <ul className='head-content-ul'>
                <li className='head-content-li'>
                  <img src='/assets/images/dashboard-navbar.png' className='db-dash' alt='db-db' />
                  <Link to={`/Manager-dashboard/${email}`}>
                    Dashboard
                  </Link>
                </li>
                <li className='head-content-li'>
                  <img src='/assets/images/nav-bar-employee.png' className='db-dash1' alt='db-emp' />
                  <Link to={`/CRUD-employee/${email}`}>
                    Employees
                  </Link>
                </li>
                <li className='head-content-li'>
                  <img src='/assets/images/calendar-navbar.png' className='db-dash' alt='db-emp' />
                  <Link to={`/Calendar/${email}`}>
                      Calendar
                    </Link>
                </li>
                <li className='head-content-li'>
                  <img src='/assets/images/time-sheet-navbar.png' className='db-dash' alt='db-emp' />
                  <Link className="nav-link" to={`/EmployeesTimeSheet/${email}`}>
                    Time Sheet
                  </Link>
                </li>
                <li className='head-content-li'>
                  <img src='/assets/images/nav-bar-profile.png' className='db-dash1' alt='db-emp' />
                  <Link to={`/profile/${email}`}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='db-content'>
                <div className='content-title'>
                 <p>Home / Add Manager</p>
                 <h5>Manager</h5>
             </div>

             <div className="employe-contnt">
              <div className="left-emp-cnt">
          <p>Add Manager,</p>
              </div>
              <div className="right-emp-cnt">
              <img src="/assets/images/format.png" alt="add-image" className="format" />
               <button>Add Profile</button>
           
              </div>
             </div>

               </div>
        <div className='add-manager'>
          
          <div className='Process-Left'>
            <form name='form' className='Signup-form' method='POST' onSubmit={handleSubmit}>
              <label className='signup-label'>
                Name:
                <input 
                  type="text" 
                  name="name"  
                  className='signup-input' 
                  value={values.name}
                  onChange={handleChange}  
                  required 
                />
              </label>
              <label className='signup-label'>
                Email:
                <input 
                  type="email"  
                  name="email"  
                  className='signup-input' 
                  value={values.email}
                  onChange={handleChange} 
                  required 
                />
              </label>
              <label className='signup-label'>
                Password:
                <input 
                  type="password"   
                  name="password" 
                  className='signup-input' 
                  value={values.password}
                  onChange={handleChange} 
                  required 
                />
              </label>
              <button className='signup-button' type="submit"> Register </button>
            </form>
          </div>
          <div className='Process-right'>
            <img src='/assets/images/Screenshot (4).png' alt='inner file missing' className='signup-img1' />
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default AddManager;
