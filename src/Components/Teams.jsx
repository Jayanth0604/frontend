import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Teams() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1500)
        return () => {
            clearTimeout(loadingTimeout);
        }
    })
    const navigate = useNavigate();
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
    const [data, setData] = useState([]);

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
    const teams = {};

    data.forEach((employee) => {
      if (!teams[employee.team]) {
        teams[employee.team] = [];
      }
      teams[employee.team].push(employee.name);
    });

    return (

        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div  className='whole-task'>
                <div className='Leave-req-head'>
                  <h3>Teams</h3>
                </div>
                    <div className='Leave-List'>
                        <div className='display-teams'>
                            {Object.entries(teams).map(([team, members]) => (
                                <div className='team' key={team}>
                                    <h2>{team}</h2>
                                    <hr />
                                    <ul>
                                        {members.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Teams