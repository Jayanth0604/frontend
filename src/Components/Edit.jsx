import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
function Edit() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const encodedName = encodeURIComponent(params.name);
    axios
      .get("http://localhost:8081/get/" + encodedName)
      .then((res) => {
        setData({
          ...data,
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
          password: res.data.Result[0].password,
          address: res.data.Result[0].address,
          role: res.data.Result[0].role,
        });
      })
      .catch((err) => console.log(err));
  }, [params.name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedEmail = encodeURIComponent(params.email);
    axios
      .put("http://localhost:8081/update/" + encodedEmail, {
        role: data.role,
        name: data.name,
        address: data.address,
        password: data.password,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/CRUD-employee");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="backgb">
      <div>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col min-vh-100 py-3">
                <div className="adjust">
                  <div className="d-flex flex-column align-items-center pt-4">
                    <form
                      className="row g-3 w-50"
                      name="form"
                      onSubmit={handleSubmit}
                    >
                      <h2>Update Employee</h2>

                      <p>
                        You can use this page to update the information of an
                        employee. Please provide the updated details for the
                        employee's name, location, image, password, and contact
                        information.
                      </p>
                      <p>
                        <strong>Name:</strong> Enter the updated name of the
                        employee.
                      </p>
                      <p>
                        <strong>Location:</strong> Provide the updated location
                        or address of the employee.
                      </p>
                      <p>
                        <strong>Password:</strong> If you want to update the
                        employee's password, provide the new password here.
                      </p>
                      <p>
                        <strong>Role:</strong> If you want to update the
                        employee's Job Role/Domain, provide the new Role here.
                      </p>
                      <p>
                        <strong>Contact Information:</strong> Make sure to
                        update the employee's contact information if necessary.
                      </p>
                      <p>
                        After making the desired changes, click the "Update"
                        button to save the updated information.
                      </p>
                      <p>
                        If you encounter any issues or need assistance, please
                        feel free to reach out to our support team.
                      </p>
                      <div className="col-12">
                        <label for="inputName" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Enter Name"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          value={data.name}
                          name="name"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputRole" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputROle"
                          placeholder="1234 Main St"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, address: e.target.value })
                          }
                          value={data.address}
                          name="address"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputAddress" className="form-label">
                          Job-Role
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="Enter Role"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, role: e.target.value })
                          }
                          value={data.role}
                          name="role"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      </div>
                      <p>
                        If you have any questions or need assistance while
                        adding an employee, feel free to reach out to our
                        support team. We're here to help you!
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Edit;
