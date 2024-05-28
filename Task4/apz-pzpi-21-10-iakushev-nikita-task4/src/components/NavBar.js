import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        alert("You logged out");
        navigate('/login/user');
    };

    const isAuthenticated = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const guestLinks = (
        <>
            <NavLink to="/contacts" activeClassName="active">Contacts</NavLink>
            <NavLink to="/about" activeClassName="active">About</NavLink>
            <NavLink to="/login/user" activeClassName="active">Login</NavLink>
            <NavLink to="/registration" activeClassName="active">Register</NavLink>
        </>
    );

    const userLinks = (
        <>
            <NavLink to="/malls" activeClassName="active">Malls</NavLink>
            <NavLink to="/stores" activeClassName="active">Stores</NavLink>
            <NavLink to="/contacts" activeClassName="active">Contacts</NavLink>
            <NavLink to="/about" activeClassName="active">About</NavLink>
            <NavLink to="/profile" activeClassName="active">Profile</NavLink>
            <NavLink to="/myOrders" activeClassName="active">My Orders</NavLink>
            <NavLink to="/cart">
                <img src="/resources/icons8-cart-64.png" alt="Cart"/>
            </NavLink>
            <NavLink to="/login/user" onClick={handleLogout}>
                <img src="/resources/transparent-web-interface-icons-icon-logout-icon-5f8bbf9bc2f138.8715297616029940757985.png" alt="Logout"/>
            </NavLink>
        </>
    );

    const workerLinks = (
        <>
            <NavLink to="/orders" activeClassName="active">Orders</NavLink>
            <NavLink to="/myShifts" activeClassName="active">Shifts</NavLink>
            <NavLink to="/profile/worker" activeClassName="active">Profile</NavLink>
            <NavLink to="/login/user" onClick={handleLogout}>
                <img src="/resources/transparent-web-interface-icons-icon-logout-icon-5f8bbf9bc2f138.8715297616029940757985.png" alt="Logout"/>
            </NavLink>
        </>
    );

    const adminLinks = (
        <>
            <NavLink to="/users" activeClassName="active">Users</NavLink>
            <NavLink to="/workers" activeClassName="active">Workers</NavLink>
            <NavLink to="/attendance" activeClassName="active">Attendance</NavLink>
            <NavLink to="/login/user" onClick={handleLogout}>
                <img src="/resources/transparent-web-interface-icons-icon-logout-icon-5f8bbf9bc2f138.8715297616029940757985.png" alt="Logout"/>
            </NavLink>
        </>
    );

    const renderLinks = () => {
        if (!isAuthenticated) {
            return guestLinks;
        }

        switch (role) {
            case 'admin':
                return adminLinks;
            case 'worker':
                return workerLinks;
            default:
                return userLinks;
        }
    };

    return (
        <nav className="navbar">
            <NavLink to="/" activeClassName="active">Mall World</NavLink>
            {renderLinks()}
        </nav>
    );
};

export default NavBar;
