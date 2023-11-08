import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footerpart from "./Footerpart";

function Dashboard() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const [manager, setManager] = useState({});
  const [employeeCount, setEmployeeCount] = useState();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/employeeCount')
      .then(res => {
        setEmployeeCount(res.data[0].employee)
      }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);

  const handleLogout = () => {
    axios.get("http://localhost:8081/logout")
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

  useEffect(() => {
    axios.get(`http://localhost:8081/manager/${email}`)
      .then((res) => setManager(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);
  const [timeupdate , setTimeUpdate] = useState(false);

  const toggleUpdate = () =>{
    setTimeUpdate(prev=> !prev)
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="whole-task">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={`/dashboard/${email}`}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/CRUD-employee/${email}`}>
                    Manage Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link">Calendar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/profile/${email}`}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Time-Sheet-Employee">
                    Time Sheet
                  </Link>
                </li>
                <li className="nav-item3">
                  <button className="nav-link" onClick={toggleUpdate}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          {timeupdate && (
        <div className="edit-time">
             
             <div className="Log-off">
               <div className="left-toggle">
               <img src={`http://localhost:8081/images/` + manager.image}  className="logoff-image"/>
             <h4>{manager.name}</h4>
             <p>{manager.email}</p>
               </div>
               <div className="right-toggle">
            <img src="/assets/images/out.jpg" alt="image missing" className="out-img" onClick={handleLogout} />
               </div>
     
             </div>
         </div>
               )}
          <div className="Leave-aproval">
            <div className="LeaveandCount1">
              <div className="nameimg">
                <div className="rounded-profile">
                  <img
                    src={`http://localhost:8081/images/` + manager.image}
                    alt="Upload Image"
                    className="nav-image"
                  />
                </div>
                <p><strong>Welcome {manager.name}</strong></p>
                <p>{manager.email}</p>
              </div>
              <div className="count1">
                <h5>Employee Count</h5>
                <img src="/assets/images/count.jpg" alt="Employee-count" className="Countimage" />
                <p>{employeeCount}</p>
              </div>
              <div className="leave1">
              <img src="/assets/images/task1new.png" alt="leave-req" className="leave-req1" />
                <Link to="/Daily-task-Submit-by-employees"><button className="req-btn">Task</button></Link>
              </div>
              <div className="leave1">
              <img src="/assets/images/applyleave.png" alt="leave-req" className="leave-req1" />
                <Link to="/Employee-Leave-Request"><button className="req-btn">Leave Request</button></Link>
              </div>
              <div className="leave1">
              <img src="/assets/images/viewteams.png" alt="Employee-count" className="leave-req1" />
                <Link to="/View-Team"><button className="req-btn">View Teams</button></Link>
              </div>
            </div>
            <div className="LeaveandCount1">
              <div className="leave1">
                <img src="/assets/images/add-manager.png" alt="Employee-count" className="leave-req1" />
                <Link to="/Add-Manager"><button className="req-btn">Add Manager</button></Link>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
