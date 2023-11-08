import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import StatusIndicator from './StatusIndicator';
import { useLoginStatus } from './LoginContext';
function EmployeeTask() {
  const { email } = useParams();
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
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
  const [selectedTitle, setSelectedTitle] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedEmail = encodeURIComponent(params.email);

    axios
      .put("http://localhost:8081/tasksubmit/" + encodedEmail, {
        project_title: selectedTitle,
        description: data.description,
        status: data.status
      })
      .then((res) => {
        if (res.data.Success) {
          alert("Report Submitted");
          console.log(res.data.Success);
        }
      })
      .catch((err) => console.log(err));
  };


  const [data, setData] = useState({
    description: "",
    status: "",
  });
  const [timeupdate, setTimeUpdate] = useState(false);

  const toggleUpdate = () => {
    setTimeUpdate(prev => !prev)
  };
  const { isLoggedIn, login, logout } = useLoginStatus();
  const [data1, setData1] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/gettasklist/${email}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData1(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);
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
          <div className="Task-submit">
            <div className="Left-tasksubmit">
              <h2>Task Submission</h2>
              <br />
              <form onSubmit={handleSubmit}>

                <label className="signup-label">Project Title:</label>
                <div class="custom-select">
                  <select onChange={(e) => setSelectedTitle(e.target.value)}>
                    <option value="">Select</option>
                    {data1.map((title, index) => (
                      <option key={index} value={title.project_title}>
                        {title.project_title}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="signup-label">Description:</label>
                <textarea
                  type="text"
                  name="description"
                  value={data.description}
                  onChange={(e) => { setData({ ...data, description: e.target.value }) }}
                  className="signup-input"
                  required
                />

                <label className="signup-label">Status:</label>
                <div class="custom-select">
                  <select
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={(e) => { setData({ ...data, status: e.target.value }) }}
                  >
                    <option>Select</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <button type="submit" className="Tsk-sub-btn">Post</button>
              </form>

            </div>
            <div className="Right-tasksubmit">
              <img src="/assets/images/Tasksubmission.png" className="Pic-task" alt="Innerfile mising" />
            </div>
          </div>

          <div className="fulltaskh2">
            <h2>Pending Task,</h2>
            <div className="Task1-part">

              {data1.map((request) => (
                <div className="task-wrapper" key={request.id}>
                  <div className="leftpart1">
                    <form className="task-form">
                      <label>Task Title:</label>
                      <p><strong>{request.project_title}</strong></p>
                      <label>Description:</label>
                      <p><strong>{request.description}</strong></p>
                      <label>Deadline</label>
                      <p><strong>{request.deadline}</strong></p>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="Task1-part">
            <h2>Task Submission Guidelines,</h2>
            <p className="des-task-p">
              <strong>Task Title:</strong> Enter a concise and descriptive title for
              the task you are currently working for. Make it clear and specific so
              that anyone reading it can understand the task's purpose.
              <br />
              <strong>Description:</strong> Provide a detailed description of the
              task. Include information like what needs to be done, any specific
              requirements, and any additional context that would be helpful for the
              assignee.
              <br />
              Specify the deadline or due date for the task. Ensure it's realistic
              and achievable.
              <br />
              <strong>Additional Assignees:</strong> If more than one person is
              involved in the task, you can add additional assignees here.
              <br />
              <strong>Attachments:</strong> If there are any files or documents
              related to the task, you can attach them using the "Upload Files"
              option. This can include design files, documents, or any other
              relevant materials.
              <br />
              Submit Task: Once you've filled out all the necessary details, click
              the "Submit" button to create the task. It will be added to the task
              management system for tracking and monitoring.
            </p>

          </div>
        </div>
      )}

    </div>
  );
}

export default EmployeeTask;
