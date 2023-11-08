import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Link, useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
function EmployeeTimesheet() {
    const { email } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [manager, setManager] = useState({});
    const localizer = momentLocalizer(moment);
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

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8081/gettimesheet")
    //         .then((res) => {
    //             if (res.data.Status === "Success") {
    //                 setData(res.data.Result);
    //             } else {
    //                 alert("Error");
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    // const [data1, setData1] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8081/logouttime")
    //         .then((res) => {
    //             if (res.data.Status === "Success") {
    //                 setData1(res.data.Result);
    //             } else {
    //                 alert("Error");
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // }, []);
    const convertToValidDate = (dateString, timeString) => {
        console.log('Received date string:', dateString);
        console.log('Received time string:', timeString);
      
        const [day, month, year] = dateString.split('/');
        const [hours, minutes] = timeString.split(':');
      
        const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
        return new Date(isoString);
      };
      
    const [loginData, setLoginData] = useState([]);
    const [logoutData, setLogoutData] = useState([]);

    useEffect(() => {
        const fetchLoginData = async () => {
            try {
                const loginResponse = await axios.get('http://localhost:8081/gettimesheet');
                if (loginResponse.data.Status === "Success") {
                    setLoginData(loginResponse.data.Result);
                } else {
                    alert("Error fetching login data");
                }
            } catch (error) {
                console.error('Error fetching login data:', error);
            }
        };

        const fetchLogoutData = async () => {
            try {
                const logoutResponse = await axios.get('http://localhost:8081/logout_time');
                if (logoutResponse.data.Status === "Success") {
                    setLogoutData(logoutResponse.data.Result);
                } else {
                    alert("Error fetching logout data");
                }
            } catch (error) {
                console.error('Error fetching logout data:', error);
            }
        };

        fetchLoginData();
        fetchLogoutData();
    }, []);
    const combinedData = [];

    const combineRecords = (loginRecord, logoutRecord) => {
        if (
          loginRecord.date === logoutRecord.date &&
          loginRecord.employeeEmail === logoutRecord.employeeEmail
        ) {
          combinedData.push({
            ...loginRecord,
            logoutTime: logoutRecord.logoutTime,
            Ddescription: logoutRecord.Ddescription, // Add Ddescription here
          });
        }
      };
      
    
    loginData.forEach(loginRecord => {
      logoutData.forEach(logoutRecord => {
        combineRecords(loginRecord, logoutRecord);
      });
    }); 
    
      
    
    
    console.log('Combined Data:', combinedData);
    console.log('Events:', combinedData.map(event => ({
        title: `${event.employeeName}'s Work Time`,
        start: new Date(`${event.date}T${event.login}`),
        end: event.logoutTime ? new Date(`${event.date}T${event.logoutTime}`) : null,
    })));
    const employees = {};

    combinedData.forEach((record) => {
      const { employeeName, employeeEmail, date, login, logoutTime, totalhours, Ddescription} = record;
  
      if (!employees[employeeEmail]) {
        employees[employeeEmail] = {
          employeeName,
          employeeEmail,
          records: [],
        };
      }
  
      employees[employeeEmail].records.push({
        date,
        login,
        logoutTime,
        totalhours,
        Ddescription,
      });
    });
    const [formUpdate , setFormUpdate] = useState(false);

    const FormUpdate =() =>{
         setFormUpdate(prev => !prev)
    }
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
                                <button onClick={FormUpdate}>Requests ! </button>

                            </div>
                        </div>

                    </div>

                    {formUpdate && (
        <div className="edit-time">
             
        <div className="Leave-toggle">
          <h3>Delay Login</h3>
          <img src='/assets/images/66847.png'  className='cancel-leave' alt='mis' onClick={FormUpdate}/>

          <div>
          {Object.values(employees).map((employee) => {
  if (employee.records.some(record => record.Ddescription)) {
    return (
      <div key={employee.employeeEmail} className='employee-list'>
        <div className='name-email-leave'>
          <h2>{employee.employeeName}</h2>
          <p>{employee.employeeEmail}</p>
        </div>
        <div className='leave-employee'>
          <table className='table-list-of-leave'>
            <thead className='time-head'>
              <tr>
                <th className='leave-th'>Date</th>
                <th className='leave-th'>Login</th>
                <th className='leave-th'>Logout</th>
                <th className='leave-th'>Total Hours</th>
                <th className='leave-th'>Reason</th>
              </tr>
            </thead>
            <tbody className='leave-body'>
              {employee.records.map((record, index) => (
                <tr key={index}>
                  <td className='leave-td'>{record.date}</td>
                  <td className='leave-td'>{record.login}</td>
                  <td className='leave-td'>{record.logoutTime}</td>
                  <td className='leave-td'>{record.totalhours}</td>
                  <td className='leave-td'>{record.Ddescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return null; // Return null if no records with Ddescription
  }
})}

      </div>
        


        </div>
    </div>
            )}

                    <div className='display-employee-time-records'>
      {Object.values(employees).map((employee) => (
        <div key={employee.employeeEmail} className='employee-info'>
          <div className='name-email'>
            <h2>{employee.employeeName}</h2>
            <p>{employee.employeeEmail}</p>
          </div>
          <div className='time-employee'>
            <table className='table-list-of-times'>
              <thead className='time-head'>
                <tr>
                  <th className='time-th'>Date</th>
                  <th className='time-th'>Login</th>
                  <th className='time-th'>Logout</th>
                  <th className='time-th'>Total Hours</th>
                </tr>
              </thead>
              <tbody className='time-body'>
                {employee.records.map((record, index) => (
                  <tr key={index}>
                    <td className='time-td'>{record.date}</td>
                    <td className='time-td'>{record.login}</td>
                    <td className='time-td'>{record.logoutTime}</td>
                    <td className='time-td'>{record.totalhours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>

    {/* {combinedData.map((employeeTime, index) => {
        return (
            <div key={index} className='employee-info'>
                <div className='name-email'>
                    <h2>{employeeTime.employeeName}</h2>
                    <p>{employeeTime.employeeEmail}</p>
                </div>
                <div className='time-employee'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Login</th>
                                <th>Logout</th>
                                <th>Total Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{employeeTime.date}</td>
                                <td>{employeeTime.login}</td>
                                <td>{employeeTime.logoutTime}</td>
                                <td>{employeeTime.totalhours}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    })} */}






                </div>
            )}
        </div>
    )
}

export default EmployeeTimesheet