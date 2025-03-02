import React from 'react'
import classes from './Navbar.module.scss'

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.navContainer}>
                <span className={classes.logo}>TravelBug</span>
                <div className={classes.navItems}>
                    <button className={classes.navButton}>Register</button>
                    <button className={classes.navButton}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar