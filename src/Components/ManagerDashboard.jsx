import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ManagerDashboard() {
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

  const currentDate = new Date();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const dateFormatted = currentDate.toLocaleString('en-US', options);

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');

  const timeFormatted = `${hours}.${minutes}`;
  const [timeupdate , setTimeUpdate] = useState(false);

  const toggleUpdate = () =>{
    setTimeUpdate(prev=> !prev)
  };
  useEffect(() => {
    axios
        .get("http://localhost:8081/getEmployee")
        .then((res) => {
            if (res.data.Status === "Success") {
                setData(res.data.Result);
            } else {
                alert("Error");
            }
        })
        .catch((err) => console.log(err));
}, []);
  const teams = {};
  const [data, setData] = useState([]);
  data.forEach((employee) => {
    if (!teams[employee.team]) {
      teams[employee.team] = [];
    }
    teams[employee.team].push(employee.name);
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='Manager-db'>

          <div className='db-header'>
            <div className='db-top'>
            <h2>A2Cloud</h2>
              
            </div>
            <div className='dp-top-img'>
            
              <img src={`http://localhost:8081/images/` + manager.image} className="logoff-image" />

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
              <p>Home / Dashboard</p>
              <h5>Manager Dashboard</h5>
            </div>

            <div className="content-1">
              <h5>Employee Count</h5>
              <img src="/assets/images/count.jpg" alt="Employee-count" className="Countimage" />
              <p>{employeeCount}</p>
            </div>
            <div className="content-2">
              <img src="/assets/images/task1new.png" alt="leave-req" className="leave-req1" />
              <Link to={`/task-submit-by-employees/${email}`}><button className="req-btn">Task</button></Link>
            </div>
            <div className="content-3">
              <img src="/assets/images/applyleave.png" alt="leave-req" className="leave-req1" />
              <Link to={`/Employee-Leave-Request/${email}`}><button className="req-btn">Leave Request</button></Link>
            </div>

          </div>
          <div className='db-content'>



            <div className='manager-profile-display'>
            <img src={`http://localhost:8081/images/` + manager.image} className="prodi-image" />
           
            <h4>{manager.name}</h4>
            <p>{manager.email}</p>
            <div className='page-list'>
            <div className='line'>
            <Link to={`/CRUD-employee/${email}`}>
                    Employees
                  </Link>
            </div>
            <div className='line'>
            <Link to={`/Calendar/${email}`}>
                      Calendar
                    </Link>
            </div>
            <div className='line'>
            <Link to={`/Add-Manager/${email}`}> Add Manager</Link>
            </div>
            <div className='line'>
            <Link to={`/Add-Events/${email}`}>
                    Add Events
                  </Link>
            </div>
            </div>
            </div>

            {/* <div className="content-2">
              <img src="/assets/images/task1new.png" alt="leave-req" className="leave-req1" />
              <Link to="/Daily-task-Submit-by-employees"><button className="req-btn">Task</button></Link>
            </div>

            <div className="content-1">
              <h5>Employee Count</h5>
              <img src="/assets/images/count.jpg" alt="Employee-count" className="Countimage" />
              <p>{employeeCount}</p>
            </div> */}

<div className='display-teams'>
                            {Object.entries(teams).map(([team, members]) => (
                                <div className='team' key={team}>
                                    <h2>{team}</h2>
                                    <hr />
                                    <ul>
                                        {members.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

          </div>

        </div>
      )}
    </div>
  )
}

export default ManagerDashboard