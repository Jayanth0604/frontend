import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
function Timesheet() {
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [manager, setManager] = useState({});
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => {
      clearTimeout(loadingTimeout);
    }
  })
  useEffect(() => {
    axios
      .get(`http://localhost:8081/manager/${email}`)
      .then((res) => {
        console.log('API Response:', res.data);
        if (res.data && res.data.Result && res.data.Result.length > 0) {
          setManager(res.data.Result[0]);
        } else {
          console.error("Manager data not found");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);

  const [time, getTime] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/gettimesheet")
      .then((res) => {
        if (res.data.Status === "Success") {
          getTime(res.data.Result);
        } else {
          alert("error getting details")
        }
      })
      .catch((err) => console.log(err))
  })
  const [formUpdate , setFormUpdate] = useState(false);

  const FormUpdate =() =>{
       setFormUpdate(prev => !prev)
  }
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
              <p>Home / Manager</p>
              <h5>Time Sheet</h5>
            </div>

            <div className="employe-contnt">
              <div className="left-emp-cnt">
                <p>Work Time</p>
              </div>
              <div className="right-emp-cnt">
                <img src="/assets/images/format.png" alt="add-image" className="format" />
                <button onClick={FormUpdate}>Do Action</button>

              </div>
            </div>

          </div>
          {formUpdate && (
        <div className="edit-time">
             
        <div className="Event-toggle">
          <h2>Add Event,</h2>
          <img src='/assets/images/66847.png'  className='cancel' alt='mis' onClick={FormUpdate}/>
          <div className="toggleevent-Left">
            <form className='Event-form' >
              <label>Event Name:</label>
              <input />

              <label>Start Date:</label>
              <input type='date' />

              <label>End Date:</label>
              <input type='date'  />

              <label>Description</label>
              <textarea />

              <button>Add</button>
            </form>
          </div>
          
          <div className="toggleevent-right">
          
            <img
              src="/assets/images/adding.avif"
              className="event-img"
              alt="inner file missing"
            />
           
          </div>
        


        </div>
    </div>
            )}
          <div className='display-employee-time-records'>
            {time.map((employeeTime, index) => (
              <div key={index} className='employee-info'>
                <div className='name-email'>
                <h2>{employeeTime.employeeName}</h2>
                <p>{employeeTime.employeeEmail}</p>
                </div>
                
                <div className='time-employee'>
                  {/* <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    views={['week']}
                    defaultView="week"
                    step={60}
                    timeslots={1}
                  /> */}
                </div>
              </div>
            ))}
          </div>



        </div>
      )}

    </div>
  )
}

export default Timesheet

