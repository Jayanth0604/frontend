import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoginStatus } from './LoginContext';
import StatusIndicator from './StatusIndicator';
function EditEmployee() {
  const params = useParams();
  const inputRef = useRef(null);
  const { isLoggedIn, login, logout } = useLoginStatus();
  const [employee, setEmployee] = useState({});
  const { email } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [timeupdate, setTimeUpdate] = useState(false);
  const toggleUpdate = () => {
    setTimeUpdate(prev => !prev)
  };
  const [data, setData] = useState({
    dob: "",
    mobile: "",
    education: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/employee/${params.email}`
        );
        const result = response.data.Result[0];
  
        setData({
          name: result.name || "",
          role: result.role || "",
          address: result.address || "",
          dob: result.dob || "",
          mobile: result.mobile || "",
          image: result.image || "",
          education: result.education || "",
          maritalStatus: result.maritalStatus || "", 
          nationality: result.nationality || "", 
          linkedin: result.linkedin || "", 
          gender: result.gender || "" 
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (params.email) {
      fetchData();
    }
  }, [params.email]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", data.image);
    formdata.append("dob", data.dob);
    formdata.append("address", data.address);
    formdata.append("role", data.role);
    formdata.append("mobile", data.mobile);
    formdata.append("education", data.education);
    formdata.append("maritalStatus", data.maritalStatus);
    formdata.append("nationality", data.nationality);
    formdata.append("linkedin", data.linkedin);
    formdata.append("gender", data.gender);
  
    const encodedEmail = encodeURIComponent(params.email);
    axios
      .put(`http://localhost:8081/updateEmployee/${encodedEmail}`, formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Updated");
        }
      })
      .catch((err) => console.log(err));
  };
  const autoCompleteAddress = (query) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleInputChange = () => {
    const query = inputRef.current.value;
    autoCompleteAddress(query);
  };


  const handleSuggestionClick = (address) => {
    setData((prevData) => ({
      ...prevData,
      address: address,
    }));
    setSuggestions([]);
  };

  return (
    <div>
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
              <h5>Profile</h5>
            </div>

            <div className="employe-contnt">
              <div className="left-emp-cnt">
                <p>Update Profile,</p>
              </div>
              <div className="right-emp-cnt">
                <img src="/assets/images/format.png" alt="add-image" className="format" />
                <button>Edit</button>

              </div>
            </div>

          </div>
          <form
            enctype="multipart/form-data"
            className="Signup-form"
            name="form"
            onSubmit={handleSubmit}
          >
            <div className="total-edit">
              <div className="edit-part1">
                <label for="inputName" className="signup-label">
                  address<span className="mark-indicatior">*</span>
                </label>
                <input
                  type="text"

                  className="profile-input"
                  id="inputName"
                  placeholder="1234 St Uk"
                  autoComplete="off"
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value });
                    handleInputChange(e);
                  }}


                  ref={inputRef}
                  value={data.address}
                  name="address"
                  required
                />
                <ul>
                  {suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleSuggestionClick(item.display_name)
                      }
                    >
                      {item.display_name}
                    </li>
                  ))}
                </ul>
                <label for="inputName" className="signup-label">
                  Date of Birth<span className="mark-indicatior">*</span>
                </label>
                <input
                  type="date"
                  className="profile-input"
                  id="inputName"
                  placeholder="01/01/1111"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, dob: e.target.value })
                  }
                  value={data.dob}
                  name="dob"
                  required
                />
                <label for="inputRole" className="signup-label">
                  Mobile<span className="mark-indicatior">*</span>
                </label>
                <input
                  type="text"
                  className="profile-input"
                  id="inputROle"
                  placeholder="Mobile Number"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, mobile: e.target.value })
                  }
                  value={data.mobile}
                  name="mobile"
                  required
                />

                <label for="inputAddress" className="signup-label">
                  Education<span className="mark-indicatior">*</span>
                </label>
                <input
                  type="text"
                  className="profile-input"
                  id="inputAddress"
                  placeholder="Higher Education"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, education: e.target.value })
                  }
                  value={data.education}
                  name="education"
                  required
                />

                <label className="signup-label" for="inputGroupFile01">
                  Select Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="profile-input"
                  id="inputGroupFile01"
                  onChange={(e) =>
                    setData({ ...data, image: e.target.files[0] })
                  }

                />
              </div>
              <div className="edit-2">

                <label htmlFor="maritalStatus" className="signup-label">
                  Marital Status
                </label>
                <select
                  className="profile-input"
                  id="maritalStatus"
                  name="maritalStatus"
                  value={data.maritalStatus}
                  onChange={(e) => setData({ ...data, maritalStatus: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                  <option value="widowed">Widowed</option>
                  <option value="divorced">Divorced</option>
                </select>

                <label htmlFor="nationality" className="signup-label">
                  Nationality<span className="mark-indicatior">*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, nationality: e.target.value })}
                  value={data.nationality}
                  className="profile-input"
                  id="nationality"
                  autoComplete="off"
                  name="nationality"
                  required
                />

                <label htmlFor="linkedin" className="signup-label">
                  Linked In
                </label>
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                  value={data.linkedin}
                  placeholder="www.linkedin.com"
                  className="profile-input"
                  id="linkedin"
                  name="linkedin"
                  required
                />

                <label htmlFor="gender" className="signup-label">
                  Gender<span className="mark-indicatior">*</span>
                </label>
                <select
                  className="profile-input"
                  id="gender"
                  name="gender"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="not to say">Not to Say</option>
                </select>


              </div>
              <button type="submit" className="Profile-update">
                Update
              </button>
            </div>
          </form>
        
        </div>
      </div>
    </div>
  );
}
export default EditEmployee;
