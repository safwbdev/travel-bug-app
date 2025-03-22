import React from 'react'
import classes from './Sidebar.module.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { HOTELS, ROOMS, ROOT, USERS } from '../../routes';

const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
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
                    <li>
                        <DashboardIcon className={classes.sidebarIcon} />
                        <span>Dashboard</span>
                    </li>
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
                    <li>
                        <LocalShippingIcon className={classes.sidebarIcon} />
                        <span>Delivery</span>
                    </li>
                    <p className={classes.sidebarTitle}>USEFUL</p>
                    <li>
                        <InsertChartIcon className={classes.sidebarIcon} />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className={classes.sidebarIcon} />
                        <span>Notifications</span>
                    </li>
                    <p className={classes.sidebarTitle}>SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className={classes.sidebarIcon} />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className={classes.sidebarIcon} />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className={classes.sidebarIcon} />
                        <span>Settings</span>
                    </li>
                    <p className={classes.sidebarTitle}>USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className={classes.sidebarIcon} />
                        <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppIcon className={classes.sidebarIcon} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className={classes.sidebarBottom}>
                <div
                    className={classes.sidebarColorOption}
                    onClick={() => dispatch({ type: "LIGHT" })}
                ></div>
                <div
                    className={classes.sidebarColorOption}
                    onClick={() => dispatch({ type: "DARK" })}
                ></div>
            </div>
        </div>
    )
}

export default Sidebar