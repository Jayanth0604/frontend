import React, { useEffect, useState } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import  timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Loader from './Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StatusIndicator from './StatusIndicator';
import { useLoginStatus } from './LoginContext';
function EmpCalendar() {

  const navigate = useNavigate();
  const { email } = useParams();
  const [timeupdate , setTimeUpdate] = useState(false);
  const [employee, setEmployee] = useState({});
  const [isLoading , setIsLoading] = useState(true)
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);

  const toggleUpdate = () =>{
    setTimeUpdate(prev=> !prev)
  };
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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/Events`) 
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
          <div className='db-content'>
            <div className='content-title'>
              <p>Home / Employee</p>
              <h5> Calendar</h5>
            </div>
            <div className="employe-contnt">
              <div className="left-emp-cnt">
          <p className='cal-p'>Explore our interactive calendar to stay updated on exciting events, important dates, and special occasions</p>
              </div>

             </div>
            </div>
          <div className='calendar'>
       <Fullcalendar 
       
       plugins= {[dayGridPlugin , timeGridPlugin , interactionPlugin]}
       initialView = {"dayGridMonth"}
       events={events.map(event =>({
        title:event.eventName,
        start:event.eventStart,
        end:event.eventEnd,
        description:event.eventDescription
       }))}
       headerToolbar = {{
        start:"title prev,next",
        center:"",
        end:"dayGridMonth, timeGridWeek, timeGridDay"
       }}
       height={"90vh"}
       eventDidMount={(info)=>{
           return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: 'auto',
            trigger:'hover',
            customClass:"popoverStyle",
            content:
            "<p>Office Event</p>",
            html:true,
           });
       }} />
       </div>
      </div>
      )}



    </div>
  );
}

export default EmpCalendar;
