import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import Timer from "./Timer";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Footerpart from "./Footerpart";
import Clock from "./Clock";
import { useLoginStatus } from './LoginContext';
import StatusIndicator from './StatusIndicator';
function Empdashboard() {

  const { isLoggedIn, login, logout } = useLoginStatus();


  const navigate = useNavigate();
  const { email } = useParams();
  const [employee, setEmployee] = useState({});
  const [employeeCount, setEmployeeCount] = useState()
  useEffect(() => {
    axios
      .get("http://localhost:8081/Empdashboard")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
        } else {
          navigate("/Login");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);
  axios.get('http://localhost:8081/employeeCount')
    .then(res => {
      setEmployeeCount(res.data[0].employee)
    }).catch(err => console.log(err));
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

  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => {
      clearTimeout(loadingTimeout)
    }
  })

  const [statusVisible, setStatusVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusVisible(false);
    }, 120000);

    return () => {
      clearTimeout(timer);
      setStatusVisible(true);
    };
  }, [employee.status])

  const [seconds, setSeconds] = useState(0);
  const [workingMessageVisible, setWorkingMessageVisible] = useState(false);






  const handleLogintime = () => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    };
    const loginTime = getCurrentTime();

    axios.post(`http://localhost:8081/login`, { email, loginTime })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success('Login time recorded successfully.');
          // setWorkingMessageVisible(true);
          login();
        } else {
          console.error("Error recording login time.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleLogoutTime = () => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    };
    const logoutTime = getCurrentTime();

    const loginTime = localStorage.getItem('loginTime'); // Get login time from localStorage

    // Parse login and logout times into Date objects
    const loginDate = new Date(`2000-01-01T${loginTime}`);
    const logoutDate = new Date(`2000-01-01T${logoutTime}`);

    // Calculate time difference in milliseconds
    const timeDifference = logoutDate - loginDate;

    // Convert time difference to hours
    const totalHours = timeDifference / (1000 * 60 * 60);

    axios.post(`http://localhost:8081/logout`, { email, logoutTime, totalHours })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success('Logout time recorded successfully.');
          setWorkingMessageVisible(false);
          logout();
        } else {
          console.error("Error recording logout time.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };




  const [data, setData] = useState([]);

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

  const userTeam = { team: employee.team };

  const getTeam = () => {
    if (userTeam.team) {
      const teamMembers = data.filter(employee => employee.team === userTeam.team);
      return teamMembers;
    }
    return [];
  };

  const teamMembers = getTeam();
  const [timeupdate, setTimeUpdate] = useState(false);
  const [timeupdate1, setTimeUpdate1] = useState(false);

  const toggleUpdate = () => {
    setTimeUpdate(prev => !prev)
  };
  const toggleUpdate1 = () => {
    setTimeUpdate1(prev => !prev)
  };
  const [values, setValues] = useState({
    newlogin: "",
    newlogout: "",
    Ddescription: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios.put("http://localhost:8081/time", {
      email: email, 
      newlogin: values.newlogin,
      newlogout: values.newlogout,
      Ddescription: values.Ddescription
    })  
    .then((res) => {
      if (res.data.success) {
        alert("Data Submitted");
      } else {
        alert("Failed to Submit");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error submitting data");
    });
  }
  
  

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/Events`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [manager1, setManager1] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8081/managerlist`)
      .then((res) => {
        setManager1(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/getleaverequestdisplay/${email}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData1(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);
  
  const [formUpdate , setFormUpdate] = useState(false);

  const FormUpdate =() =>{
       setFormUpdate(prev => !prev)
  }
  const currentDate = new Date();

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
          <div>
            <div className='db-header'>
              <div className='db-top'>
                <h2>A2Cloud</h2>

              </div>
              <div className='dp-top-img'>
                <StatusIndicator isLoggedIn={isLoggedIn} />
                <img src={`http://localhost:8081/images/` + employee.image} className="logoff-image" />

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
                    <img src="/assets/images/66847.png" alt="remove" className="cancel-togle" onClick={toggleUpdate} />
                    <div className="left-toggle">
                      <img src={`http://localhost:8081/images/` + employee.image} className="off-image" />
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
            <div className="profile-cont">
              <div className='db-content'>
                <div className='content-title'>
                  <p>Home / Dashboard</p>
                  <h5>Employee Dashboard</h5>
                </div>

                <div className="LeaveandCount">
                  <div className='content-title1'>
                    <p> <Clock /></p>
                  </div>
                  <div className="leave">
                    <div className="image-container">
                      <img src="/assets/images/timechange.webp" alt="Time Change Image" className="change-time" />
                      <div className="text-overlay" onClick={toggleUpdate1}>Edit Time</div>
                    </div>
                    {timeupdate1 && (
                      <div className="timeupdate">
                        <img src="/assets/images/66847.png" alt="remove" className="cancel-togle" onClick={toggleUpdate1} />
                        <form onSubmit={handleSubmit}>
                          <h6>UpdateTime</h6>
                          <div className="start-time">
                            <label>Start Time</label>
                            <input type="time" name="newlogin" onChange={handleChange} value={values.newlogin} />
                          </div>
                          <div className="endtime">
                            <label>End Time</label>
                            <input type="time" name="newlogout" onChange={handleChange} value={values.newlogout} />
                          </div>

                          <textarea placeholder="Reason" name="Ddescription" onChange={handleChange} value={values.Ddescription} />
                          <button type="submit" className="time-update reason">Submit</button>
                        </form>
                      </div>
                    )}
                    <button className="in" onClick={handleLogintime}>
                      <img src="/assets/images/login.png" className="log" alt="error" />
                      <p>Login</p>
                    </button>
                    <button className="out" onClick={handleLogoutTime}>
                      <img src="/assets/images/logout.png" className="log" alt="error" />
                      <p>Logout</p>
                    </button>
                  </div>
                  <div className="leave">
                    <h5>Task</h5>
                    <img src="/assets/images/task1new.png" alt="Employee-count" className="Countimage" />
                    <p>{employee.projecttitle}</p>
                  </div>
                </div>


              </div>
              <div className='db-content'>



                <div className='manager-profile-display'>
                  <img src={`http://localhost:8081/images/` + employee.image} className="prodi-image" />

                  <h4>{employee.name}</h4>
                  <p>{employee.email}</p>
                  <div className='page-list'>
                    <div className='line'>
                      <Link to={`/Task-Project/${email}`}>
                        Task & Projects
                      </Link>
                    </div>
                    <div className='line'>
                      <Link to={`/ApplyLeave/${email}`}>
                        Apply Leave
                      </Link>
                    </div>
                    <div className='line'>
                      <Link to={`/employee-calendar/${email}`}>
                        Calendar
                      </Link>
                    </div>
                    <div className='line'>
                      <Link to={`/Employee-profile/${email}`}>
                        Profile
                      </Link>
                    </div>
                  </div>
                  <div className="notifications">
                    <h6>Leave Status</h6>
                    <img src="/assets/images/notification2.jpg" alt="img miss" className="noti-img" onClick={FormUpdate} />
                  </div>
                </div>
                {formUpdate && (
        <div className="edit-time">
             
        <div className="Event-toggle">
          <h2>Leave Records,</h2>
          <div className="cancel-div">
          <img src='/assets/images/66847.png'  className='cancel' alt='mis' onClick={FormUpdate}/>
          </div>
         
<div className="leave-list-status">
  <div className="leavehead">
    <div className="leave-head-l">
   <img src="/assets/images/leavelist.avif" className="leave-list-img" alt="imagemissing" />
    </div>
    <div className="leave-head-r">
<p>Here you can review your <span>leave history</span> and check the status of your pending requests.</p>
    </div>
  </div>
  <div className='leave-body'>
  <table className='table-list-of-leave'>
        <thead className='time-head'>
          <tr>
            <th className='leave-th'>Leave Type</th>
            <th className='leave-th'>Start Date</th>
            <th className='leave-th'>End Date</th>
            <th className='leave-th'>Status</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((request) => (
            <tr key={request.id}>
              <td className='leave-td'>{request.leavetype}</td>
              <td className='leave-td'>{request.startdate}</td>
              <td className='leave-td'>{request.enddate}</td>
              <td className='leave-td'>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
</div>
        </div>
    </div>
            )}
                <div className="team-list">
                  <h5 > {employee.team}</h5>

                  {teamMembers.map((member, index) => (
                    <div key={index} className="teammembers">
                      <div className="spe-te">
                        <div className="teamlist-left">
                          <img src={`http://localhost:8081/images/` + member.image} className="rounded-profile2" />
                        </div>
                        <div className="teamlist-right">
                          <p>{member.name}</p>
                        </div>
                      </div>

                    </div>
                  ))}

                </div>

                <div className="bg-event">
                  <h4>User's</h4>
                  {manager1.map((manager, index) => (
                    <div key={index} className="event-display">

                      <div className="list-left-img">
                        <img src={`http://localhost:8081/images/` + manager.image} className="rounded-profile2" />
                      </div>
                      <div className="list-right">

                        <h5>{manager.name}<span>(Manager)</span></h5>
                        <p>{manager.email}</p>
                      </div>
                    </div>
                  ))}
                  {data.map((employee, index) => (
                    <div key={index} className="event-display">

                      <div className="list-left-img">
                        <img src={`http://localhost:8081/images/` + employee.image} className="rounded-profile2" />
                      </div>
                      <div className="list-right">

                        <h5>{employee.name}</h5>
                        <p>{employee.email}</p>
                      </div>
                    </div>
                  ))}

                </div>
                <div className="bg-event">
                  <h4>Upcoming Events</h4>
                  {events.filter(event => new Date(event.eventEnd) >= currentDate).map((event, index) => (
                    <div key={index} className="event-display">

                      <div className="event-left">
                        <p>{event.eventName} </p>
                      </div>
                      <div className="event-right">
                        <p>{event.eventStart}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
              <div>

              </div>


            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Empdashboard;
