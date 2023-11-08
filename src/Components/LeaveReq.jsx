import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

function LeaveReq() {
  const { email } = useParams();
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

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getleaverequest")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleStatusUpdate = async (id) => {
    const selectedStatus = document.getElementById(`status-${id}`).value;
  
    try {
      await axios.put(`http://localhost:8081/leaveapproval`, {
        id,
        status: selectedStatus,
      });
  
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  


  useEffect(() => {
    axios
      .get(`http://localhost:8081/manager/${email}`)
      .then((res) => {
        if (res.data && res.data.Result && res.data.Result.length > 0) {
          setManager(res.data.Result[0]);
        } else {
          console.error("Manager data not found");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);
  const currentDate = new Date();

  
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
                  calendar
                </li>
                <li className='head-content-li'>
                  <img src='/assets/images/time-sheet-navbar.png' className='db-dash' alt='db-emp' />
                  Time Sheet
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
              <h5>Leave Request</h5>
            </div>

            <div className="employe-contnt">
              <div className="left-emp-cnt">
                <p>List !</p>
              </div>
              <div className="right-emp-cnt">
                <img src="/assets/images/format.png" alt="add-image" className="format" />
                <button>Do Action</button>

              </div>
            </div>

          </div>
          <div  className='leave-employee-list'>
          <table className='table-list-of-leave'>
            <thead className='time-head'>
              <tr>
                <th className='leave-th'>Employee Name</th>
                <th className='leave-th'>Employee Email</th>
                <th className='leave-th'>Leave Type</th>
                <th className='leave-th'>From</th>
                <th className='leave-th'>Untill</th>
                <th className='leave-th'>Reason</th>
                <th className='leave-th'>Do Action</th>
                <td className='leave-td'></td>
                <th className='leave-th'>Manager status</th>
              </tr>
            </thead>
            <tbody className='leave-body'>
            {data.filter(record => new Date(record.enddate) >= currentDate).map((record, index) => (
              <tr key={index}>
                  <td className='leave-td'>{record.employee_name}</td>
                  <td className='leave-td'>{record.employee_email}</td>
                  <td className='leave-td'>{record.leavetype}</td>
                  <td className='leave-td'>{record.startdate}</td>
                  <td className='leave-td'>{record.enddate}</td>
                  
                  <td className='leave-td'>{record.reason}</td>
                  <td className='leave-td'>
                    {" "}
                    <select id={`status-${record.id}`}>
                      <option>Select</option>
                      <option value='Approved'>Approved</option>
                      <option value='Rejected'>Rejected</option>
                    </select>
                  </td>
                  <td
                    className='leave-td'
                    onClick={() => handleStatusUpdate(record.id)}
                  >
                    <FontAwesomeIcon icon={faCheckSquare} />
                  </td>
                  <td className='leave-td'>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        </div>


      )}
    </div>
  )
}
export default LeaveReq;

