import React, { useState } from 'react'
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { ATTRACTIONS, HOTELS, ROOMS, ROOT, USERS } from '../../routes';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from 'react-toastify';

const Sidebar = () => {

    const { user, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleLogout = (event) => {
        if (confirm("Log out?")) {
            event.preventDefault();
            dispatch({ type: "LOGOUT" })
            toast.success(`You have logged out!`);
            navigate("/");
        }
    }

    const links = [
        { label: 'Dashboard', url: ROOT, icon: (<DashboardIcon />) },
        { label: 'Users', url: USERS, icon: (<GroupIcon />) },
        { label: 'Hotels', url: HOTELS, icon: (<LocationCityIcon />) },
        { label: 'Rooms', url: ROOMS, icon: (<HotelIcon />) },
        { label: 'Attractions', url: ATTRACTIONS, icon: (<HotelIcon />) },
    ];

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {links.map((link, index) => (
                    <ListItem key={link.label} disablePadding>
                        <Link to={link.url} style={{ textDecoration: "none", color: "inherit" }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar alt={user.username} src={user.img || null} />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Settings'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Log Out'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

}

export default Sidebar