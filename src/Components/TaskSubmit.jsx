import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
function TaskSubmit() {
  const { email } = useParams();
  const [manager, setManager] = useState({});
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500)
    return () => {
      clearTimeout(loadingTimeout);
    }
  })
  const [data , setData] = useState([]);

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
  const [data1, setData1] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/gettask")
      .then((res) => {
        if (res.data.Status === "success") {
          setData1(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleStatusUpdate = async (name) => {
    const selectedStatus = document.getElementById(`approval-${name}`).value;

    try {
      await axios.put(`http://localhost:8081/taskapproval/${name}`, {
        status: selectedStatus,
      });

      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
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
                 <h5>Task Submitted</h5>
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
               <div>
               <table className='custom-table'>
    <thead>
      <tr>
        <th className='custom-table-header'>Name</th>
        <th className='custom-table-header'>Title</th>
        <th className='custom-table-header'>Description</th>
        <th className='custom-table-header'>Employee Status</th>
        <th className='custom-table-header'>Do Action</th>
        <th className='custom-table-header'>Manager Status</th>
      </tr>
    </thead>
    <tbody>
      {data1.map((employee, index) => (
        <tr key={index}>
          <td className='custom-table-cell'>{employee.employee_name}</td>
          <td className='custom-table-cell'>{employee.project_title}</td>
          <td className='custom-table-cell'>{employee.employee_description}</td>
          <td className='custom-table-cell'>{employee.employee_status}</td>
          <td className='custom-table-cell'>
            <select >
              <option>Select</option>
              <option>Approve</option>
              <option>Reject</option>
            </select>
          </td>
          <td className='custom-table-cell'>{employee.status}</td>
          {/* Add more <td> elements for "Do Action" and "Manager Status" */}
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

export default TaskSubmit