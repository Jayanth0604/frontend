import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

function ApplyLeave() {
    const params = useParams();
    const [employee, setEmployee] = useState({});
    const { email } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false)
        }, 1500);
        
        return () => clearTimeout(loadingTimeout);
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8081/employee/${email}`)
            .then((res) => setEmployee(res.data.Result[0]))
            .catch((err) => console.log(err));
    }, [email]);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios
          .post("http://localhost:8081/leave/" + encodeURIComponent(params.email), {
              leavetype: data.leavetype,  
              startdate: data.startdate,
              enddate: data.enddate,
              reason: data.reason
          })
          .then((res) => {
              if (res.data.Success) {   
                  alert("Leave Request Sent");
                  console.log(res.data.Success);
              }
          })
          .catch((err) => console.log(err));
  };
  

    const [data, setData] = useState({
        leavetype: "Sick Leave",   
        startdate: "",
        enddate: "",
        reason:"",
    });
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
    const [timeupdate, setTimeUpdate] = useState(false);
  
    const toggleUpdate = () => {
      setTimeUpdate(prev => !prev)
    };
    
    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div >
                               <div className='db-header'>
              <div className='db-top'>
                <h2>A2Cloud</h2>

              </div>
              <div className='dp-top-img'>

                <img src={`http://localhost:8081/images/` + employee.image} className="logoff-image" />

              </div>
              <div className='Nav-bar-header'>
                <ul className='head-content-ul'>
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
                    calendar
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
                 <h5>Apply Leave</h5>
             </div>

             <div className="employe-contnt">
              <div className="left-emp-cnt">
          <p>Leave form,</p>
              </div>
              <div className="right-emp-cnt">
              <img src="/assets/images/format.png" alt="add-image" className="format" />
              <button>Apply Leave</button>
           
              </div>
             </div>

               </div>
                    <div className='Leave-Form'>
                        <form className='leave-req-form' name='form' onSubmit={handleSubmit}>
                            <label>Type</label>
              <div className="Sele-Opt">
                <label>
                  <input
                    type="radio"
                    name="loginType"
                    value="Sick Leave"
                    checked={data.leavetype === "Sick Leave"}
                    onChange={(e)=>{setData({...data, leavetype: e.target.value})}}
                  />
                  Sick Leave
                </label>
                <label>
                  <input
                    type="radio"
                    name="loginType"
                    value="Personal Leave"
                    checked={data.leavetype === "Personal Leave"}
                    onChange={(e)=>{setData({...data,leavetype: e.target.value})}}

                  />
                  Personal Leave
                </label>
                <label>
                  <input
                    type="radio"
                    name="loginType"
                    value="Parental Leave"
                    checked={data.leavetype === "Parental Leave"}
                    onChange={(e)=>{setData({...data, leavetype: e.target.value})}}

                  />
                  Parental Leave
                </label>
              </div>

                            <label>From</label>
                            <input
                                type='date'
                                value={data.startdate}
                                onChange={(e) => { setData({...data, startdate:e.target.value})}}
                                required
                            />

                            <label>To</label>
                            <input
                                type='date'
                                value={data.enddate}
                                onChange={(e) => { setData({...data, enddate:e.target.value})}}
                                required
                            />
                        
                            <label>Reason</label>
                            <textarea
                                value={data.reason}
                                onChange={(e) => { setData({...data, reason:e.target.value})}}
                                required
                            />

                            <button type='submit'>Apply</button>
                        </form>
                    </div>
                    <div className='leave-form-right'>
               <img src='/assets/images/applyleave-mp.png' className='leave-img'alt='image missing'/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplyLeave;
