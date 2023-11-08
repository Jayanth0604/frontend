import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Footerpart from "./Footerpart";
import StatusIndicator from './StatusIndicator';
import { useLoginStatus } from './LoginContext';

function EmpProfile() {
  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/Login");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };
  const navigate = useNavigate();

  const { email } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);
  const [ isLoading , setIsLoading] = useState(true);
  useEffect(()=>{
   const loadingTimeout = setTimeout(()=>{
    setIsLoading(false);
   },1500)
   return() => {
    clearTimeout(loadingTimeout)
   }
  })
  const [timeupdate , setTimeUpdate] = useState(false);

  const toggleUpdate = () =>{
    setTimeUpdate(prev=> !prev)
  };

  const { isLoggedIn, login, logout } = useLoginStatus();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
                <div className='dp-top-img'>
                <StatusIndicator isLoggedIn={isLoggedIn} />
                <img src={`http://localhost:8081/images/` + employee.image}  className="logoff-image"/>
 
                </div>
                <div className='Nav-bar-header'>
                  <div className='menu-toggle' onClick={toggleMenu}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                  </div>
                  <ul className={`head-content-ul ${isMenuOpen ? 'active' : ''}`}>
                  <li className='head-content-li'>
                    <img src='/assets/images/dashboard-navbar.png' className='db-dash' alt='db-db' />
                    <Link to={`/Employee-dashboard/${email}`}>
                      Dashboard
                    </Link>
                  </li>
                  <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-employee.png' className='db-dash1' alt='db-emp' />
                    <Link to={`/Task-Project/${email}`}>
                      Task & Projects
                    </Link>
                  </li>
                  <li className='head-content-li'>
                    <img src='/assets/images/calendar-navbar.png' className='db-dash' alt='db-emp' />
                    <Link to={`/employee-calendar/${email}`}>
                      Calendar
                    </Link>
                  </li>
                  <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-profile.png' className='db-dash1' alt='db-emp' />
                    <Link to={`/Employee-profile/${email}`}>
                      Profile
                    </Link>
                  </li>
                  <li className='head-content-li' onClick={toggleUpdate}>
                    <img src='/assets/images/logout-navbar.png' className='db-dash' alt='db-emp' />
                    Logout
                  </li>
                </ul>
               </div>
               {timeupdate && (
        <div className="edit-time">
             
             <div className="Log-off">
             <img src="/assets/images/66847.png" alt="remove" className="cancel-togle" onClick={toggleUpdate}  />
               <div className="left-toggle">
               <img src={`http://localhost:8081/images/` + employee.image}  className="off-image"/>
             <h4>{employee.name}</h4>
             <p>{employee.email}</p>
               </div>
               <div className="right-toggle">
            <img src="/assets/images/out.jpg" alt="image missing" className="out-img" onClick={handleLogout} />
               </div>
     
             </div>
         </div>
               )}
               </div>
               <div className='db-content'>
                <div className='content-title'>
                 <p>Home / Profile</p>
                 <h5>Profile</h5>
             </div>

             <div className="employe-contnt">
              <div className="left-emp-cnt">
          <p>Update Profile,</p>
              </div>
              <div className="right-emp-cnt">
              <img src="/assets/images/format.png" alt="add-image" className="format" />
              <Link
                to={"/EmployeeEditOption/" + encodeURIComponent(employee.email)}
              > <button>Edit Profile</button></Link>
           
              </div>
             </div>

               </div>

<div>
<div className="bg-content">
          <div className="overall-profile">
            <div className="pro-prfile">
              <div className="border-shadow1">
                <img
                  src={`http://localhost:8081/images/` + employee.image}
                  alt="Upload Image"
                  className="pro-picbyeemployee"
                />
              </div>
            </div>
           

            <div className="left-profile">
              <h1>Profile,</h1>
              <label>Name</label>
              <strong>
                {" "}
                <p>{employee.name}</p>
              </strong>
              <label>Address</label>
              <strong>
                {" "}
                <p>{employee.address}</p>
              </strong>
              <label>Email</label>
              <strong>
                {" "}
                <p>{employee.email}</p>
              </strong>
              <label>Title</label>
              <strong>
                {" "}
                <p>{employee.role}</p>
              </strong>
              <label>Gender</label>
              <strong>
                {" "}
                <p>{employee.gender}</p>
              </strong>
              <label>LinkedIn</label>
              <strong>
                {" "}
                <p>
  <a href={employee.linkedin} target="_blank" rel="noopener noreferrer">
    {employee.linkedin}
  </a>
</p>
              </strong>
            </div>
            <div className="Right-profile">
              <label>DOB</label>
              <strong>
                {" "}
                <p>{employee.dob}</p>
              </strong>
              <label>Mobile Number</label>
              <strong>
                {" "}
                <p>{employee.mobile}</p>
              </strong>
              <label>Higher Education</label>
              <strong>
                {" "}
                <p>{employee.education}</p>
              </strong>
              <label>Nationality</label>
              <strong>
                {" "}
                <p>{employee.nationality}</p>
              </strong>
              <label>Marital Status</label>
              <strong>
                {" "}
                <p>{employee.maritalstatus}</p>
              </strong>
              <Link
                to={"/EmployeeEditOption/" + encodeURIComponent(employee.email)}
              >
                <button className="Edit-Employee-Option">
                  {" "}
                  <i className="fs-4 bi-pencil-square"></i>
                </button>
              </Link>
            </div>
          </div>  
        </div>
</div>

        </div>
      )}
    </div>
  );
}

export default EmpProfile;
