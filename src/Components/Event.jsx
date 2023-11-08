import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Event() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [manager, setManager] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500)
    return () => {
      clearTimeout(loadingTimeout);
    }
  })
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
  const [timeupdate, setTimeUpdate] = useState(false);

  const toggleUpdate = () => {
    setTimeUpdate(prev => !prev)
  };

  const [formUpdate , setFormUpdate] = useState(false);

  const FormUpdate =() =>{
       setFormUpdate(prev => !prev)
  }
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
  const [data ,setData] = useState({
    eventName:"",
    eventStart:"",
    eventEnd:"",
    eventDescription:""
  });
  
  const handleSubmit = (event) =>{
     event.preventDefault();
  
     axios.post("http://localhost:8081/Addevent",data)
     .then((res)=>{
      if(res.data.success){
        alert("Event Added")
      }else{
        alert("Error Posting")
      }
     }) 
     .catch((err)=>{
      console.log(err)
     })
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
                <img src={`http://localhost:8081/images/` + manager.image}  className="logoff-image"/>
 
                </div>
                <div className='Nav-bar-header'> 
                 <ul className='head-content-ul'>
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
                  <img src='/assets/images/calendar-navbar.png' className='db-dash' alt='db-emp' />
                  <Link to={`/Calendar/${email}`}>
                      Calendar
                    </Link>
                </li>
                <li className='head-content-li'>
                  <img src='/assets/images/time-sheet-navbar.png' className='db-dash' alt='db-emp' />
                  <Link className="nav-link"to={`/EmployeesTimeSheet/${email}`}>
                    Time Sheet
                  </Link>
                </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-profile.png' className='db-dash1' alt='db-emp'/>
                    <Link  to={`/profile/${email}`}>
                    Profile
                  </Link>
                    </li>
                 </ul>
               </div>
               </div>
               <div className='db-content'>
                <div className='content-title'>
                 <p>Home / Manager</p>
                 <h5>Events</h5>
             </div>

             <div className="employe-contnt">
              <div className="left-emp-cnt">
          <p>Add Events</p>
              </div>
              <div className="right-emp-cnt">
              <img src="/assets/images/format.png" alt="add-image" className="format" />
              <button>Add</button>
           
              </div>
             </div>

               </div>


          <div className='Event-head'>
            <div className='Event-img'>
              
              <img src='/assets/images/add-event.avif' alt='img miss' className='eventimg' />
              <button onClick={FormUpdate}>Create Event</button>
            </div>
            {formUpdate && (
        <div className="edit-time">
             
        <div className="Event-toggle">
          <h2>Add Event,</h2>
          <img src='/assets/images/66847.png'  className='cancel' alt='mis' onClick={FormUpdate}/>
          <div className="toggleevent-Left">
            <form className='Event-form' onSubmit={handleSubmit}>
              <label>Event Name:</label>
              <input onChange={(e)=>{setData({...data,eventName:e.target.value})}}/>

              <label>Start Date:</label>
              <input type='date' onChange={(e)=>{setData({...data,eventStart:e.target.value})}}/>

              <label>End Date:</label>
              <input type='date' onChange={(e)=>{setData({...data,eventEnd:e.target.value})}} />

              <label>Description</label>
              <textarea onChange={(e)=>{setData({...data,eventDescription:e.target.value})}}/>

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
            <div className='Event-content'>
              <h3>Event Creating Form</h3>
              <h5>Create a New Event</h5>
    <p>Please fill out the following details to create a new event:<br /><br />

<strong>Event Details</strong><br />
<span>Event Title: </span>[Enter the title of your event]<br />
<div className='deg'>
<strong>Event Dates</strong><br />
<span>Start Date & Time:</span> [Select the start date and time of your event]<br />
<span>End Date & Time: </span>[Select the end date and time of your event]<br /><br />
Once you've filled out the required information, click on the "Create Event" button to add it to the calendar.</div></p>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Event;
