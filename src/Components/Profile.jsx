import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import Footerpart from "./Footerpart";
function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [manager, setManager] = useState({});
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  const navigate = useNavigate();
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
  const {email} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8081/manager/${email}`)
      .then((res) => {
        console.log('API Response:', res.data); // Log the entire response
        if (res.data && res.data.Result && res.data.Result.length > 0) {
          setManager(res.data.Result[0]);
        } else {
          console.error("Manager data not found");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);
  const [timeupdate , setTimeUpdate] = useState(false);

  const toggleUpdate = () =>{
    setTimeUpdate(prev=> !prev)
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
               <div className='db-header'> 
                <div className='db-top'>
                    <h2>A2Cloud</h2>
                </div>
                <div className='dp-top-img'>
                <img src={`http://localhost:8081/images/` + manager.image}  className="logoff-image"/>
 
                </div>
                <div className='Nav-bar-header'>
                  <div className='menu-toggle' onClick={toggleMenu}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                  </div>
                  <ul className={`head-content-ul ${isMenuOpen ? 'active' : ''}`}>
                    <li  className='head-content-li'>
                        <img src='/assets/images/dashboard-navbar.png' className='db-dash' alt='db-db'/>
                        <Link  to={`/Manager-dashboard/${email}`}>
                    Dashboard
                  </Link>
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-employee.png' className='db-dash1' alt='db-emp'/>
                    <Link  to={`/CRUD-employee/${email}`}>
                   Employees
                  </Link>
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/calendar-navbar.png' className='db-dash' alt='db-emp'/>
                    <Link to={`/Calendar/${email}`}>
                      Calendar
                    </Link>
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/time-sheet-navbar.png' className='db-dash' alt='db-emp'/>
                    <Link className="nav-link" to={`/EmployeesTimeSheet/${email}`}>
                    Time Sheet
                  </Link>
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-profile.png' className='db-dash1' alt='db-emp'/>
                    <Link  to={`/profile/${email}`}>
                    Profile
                  </Link>
                    </li>
                    <li className='head-content-li' onClick={toggleUpdate}>
                    <img src='/assets/images/logout-navbar.png' className='db-dash' alt='db-emp'/>
                        Logout
                    </li>
                 </ul>
               </div>
               {timeupdate && (
        <div className="edit-time">
             
             <div className="Log-off">
             <img src="/assets/images/66847.png" alt="remove" className="cancel-togle" onClick={toggleUpdate}  />
               <div className="left-toggle">
               <img src={`http://localhost:8081/images/` + manager.image}  className="off-image"/>
             <h4>{manager.name}</h4>
             <p>{manager.email}</p>
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
                to={"/Manager-Profile/" + encodeURIComponent(manager.email)}
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
                  src={`http://localhost:8081/images/` + manager.image}
                  alt="Upload Image"
                  className="pro-picbyeemployee"
                />
              </div>
            </div>
            {/* <img src={`http://localhost:8081/images/`+employee.image} alt="" className='empImg'/> */}

            <div className="left-profile">
              <h1>Profile,</h1>
              <label>Name</label>
              <strong>
                {" "}
                <p>{manager.name}</p>
              </strong>
              <label>Address</label>
              <strong>
                {" "}
                <p>{manager.address}</p>
              </strong>
              <label>Email</label>
              <strong>
                {" "}
                <p>{manager.email}</p>
              </strong>
              <label>Title</label>
              <strong>
                {" "}
                <p>{manager.role}</p>
              </strong>
              <label>Gender</label>
              <strong>
                {" "}
                <p>{manager.gender}</p>
              </strong>
              <label>LinkedIn</label>
              <strong>
                {" "}
                <p>
  <a href={manager.linkedin} target="_blank" rel="noopener noreferrer">
    {manager.linkedin}
  </a>
</p>

              </strong>
            </div>
            <div className="Right-profile">
              <label>DOB</label>
              <strong>
                {" "}
                <p>{manager.dob}</p>
              </strong>
              <label>Mobile Number</label>
              <strong>
                {" "}
                <p>{manager.mobile}</p>
              </strong>
              <label>Higher Education</label>
              <strong>
                {" "}
                <p>{manager.education}</p>
              </strong>

              <label>Nationality</label>
              <strong>
                {" "}
                <p>{manager.nationality}</p>
              </strong>
              <label>Marital Status</label>
              <strong>
                {" "}
                <p>{manager.maritalstatus}</p>
              </strong>
              <Link
                to={"/Manager-Profile/" + encodeURIComponent(manager.email)}
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
{/* <Footerpart /> */}
        </div>
      )}
    </div>
  );
}

export default Profile;
