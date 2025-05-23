import React, { useContext, useState } from 'react'
import classes from './Navbar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BiSolidBugAlt, BiSolidUser } from "react-icons/bi";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    const [openUser, setOpenUser] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
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
                <Link to={'/'} className={classes.logoLink}>
                    <span className={classes.logo}>
                        <BiSolidBugAlt /> TravelBug</span>
                </Link>
                <div className={classes.menuButton} onClick={() => setOpenMenu(!openMenu)}><IoMenu /></div>
                <div className={classes.mobileMenu} style={{ display: openMenu ? 'flex' : 'none' }}>
                    {user ? (<LoggedUserLink />) : (<LoginLinks />)}
                    {user && (<span onClick={confirmLogout}>
                        <b>Log Out</b>
                    </span>)}
                </div>
                <div className={classes.loginLinks}>
                    {user ? (<LoggedUserLink />) : (<LoginLinks />)}
                </div>
            </div>
        </div>
    )
}

export default Navbar