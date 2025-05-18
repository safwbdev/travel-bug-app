import React, { useContext, useState } from 'react'
import classes from './Navbar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BiSolidBugAlt, BiSolidUser } from "react-icons/bi";

const Navbar = () => {
    const [openUser, setOpenUser] = useState(false)
    const { user, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const confirmLogout = (event) => {
        if (confirm("Log out?")) {
            event.preventDefault();
            dispatch({ type: "LOGOUT" })
            navigate("/");
        }
    }

    const LoginLinks = () => (<div className={classes.navItems}>
        <Link to={'/register'}>
            <button className={classes.navButton}>Register</button>
        </Link>
        <Link to={'/login'}>
            <button className={classes.navButton}>Login</button>
        </Link>
    </div>)

    const LoggedUserLink = () => (
        <>
            <span className={classes.user} onClick={() => setOpenUser(!openUser)}>
                <BiSolidUser />{user.username}
            </span>
            {openUser && (<div className={classes.userWindow}>
                <span onClick={confirmLogout}>
                    Log Out
                </span>
            </div>)}
        </>
    )

    return (
        <div className={classes.navbar}>
            <div className={classes.navContainer}>
                <Link to={'/'} style={{ color: 'inherit', textDecoration: "none" }}>
                    <span className={classes.logo}>
                        <BiSolidBugAlt /> TravelBug</span>
                </Link>
                {/* NOTE: UNHIDE ON MOBILE IN FUTURE */}
                <div className={classes.loginLinks}>
                    {user ? (<LoggedUserLink />) : (<LoginLinks />)}
                </div>
            </div>
        </div>
    )
}

export default Navbar