import React, { useContext } from 'react'
import classes from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BiSolidBugAlt, BiSolidUser } from "react-icons/bi";

const Navbar = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className={classes.navbar}>
            <div className={classes.navContainer}>
                <Link to={'/'} style={{ color: 'inherit', textDecoration: "none" }}>
                    <span className={classes.logo}>
                        <BiSolidBugAlt /> TravelBug</span>
                </Link>
                {user ? (<span className={classes.user}><BiSolidUser />{user.username}</span>) : (<div className={classes.navItems}>
                    <button className={classes.navButton}>Register</button>
                    <button className={classes.navButton}>Login</button>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar