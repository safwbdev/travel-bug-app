import React, { useContext } from 'react'
import classes from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className={classes.navbar}>
            <div className={classes.navContainer}>
                <Link to={'/'} style={{ color: 'inherit', textDecoration: "none" }}>
                    <span className={classes.logo}>TravelBug</span>
                </Link>
                {user ? (<span>{user.username}</span>) : (<div className={classes.navItems}>
                    <button className={classes.navButton}>Register</button>
                    <button className={classes.navButton}>Login</button>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar