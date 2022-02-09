import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Yooda Hostel</span>
                <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to="/addfood">Add food</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allfoods">All foods</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addstudent">Add Student</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/allstudents">All Students</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;