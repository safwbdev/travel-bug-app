import React from 'react'
import classes from './Sidebar.module.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ATTRACTIONS, HOTELS, ROOMS, ROOT, USERS } from '../../routes';
import { AuthContext } from '../../context/AuthContext';

import { toast } from 'react-toastify';

const Sidebar = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const confirmLogout = (event) => {
        if (confirm("Log out?")) {
            event.preventDefault();
            dispatch({ type: "LOGOUT" })
            toast.success(`You have logged out!`);
            navigate("/");
        }
    }
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarTop}>
                <Link to={ROOT} style={{ textDecoration: "none" }}>
                    <span className={classes.sidebarLogo}>Travel Bug</span>
                </Link>
            </div>
            <hr />
            <div className={classes.sidebarCenter}>
                <ul>
                    <p className={classes.sidebarTitle}>MAIN</p>
                    <Link to={`/`} style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className={classes.sidebarIcon} />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className={classes.sidebarTitle}>LISTS</p>
                    <Link to={`/${USERS}`} style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className={classes.sidebarIcon} />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to={`/${HOTELS}`} style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className={classes.sidebarIcon} />
                            <span>Hotels</span>
                        </li>
                    </Link>
                    <Link to={`/${ROOMS}`} style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className={classes.sidebarIcon} />
                            <span>Rooms</span>
                        </li>
                    </Link>
                    <Link to={`/${ATTRACTIONS}`} style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className={classes.sidebarIcon} />
                            <span>Attractions</span>
                        </li>
                    </Link>
                    <p className={classes.sidebarTitle}>USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className={classes.sidebarIcon} />
                        <span>Profile</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className={classes.sidebarIcon} />
                        <span>Settings</span>
                    </li>
                    <li onClick={confirmLogout}>
                        <ExitToAppIcon className={classes.sidebarIcon} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar