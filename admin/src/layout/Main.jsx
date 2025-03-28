import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import classes from './Main.module.scss'
import { AuthContext } from '../context/AuthContext';
import Navbar2 from '../components/navbar/Navbar2';

const Main = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className={classes.main}>
            {user && <Navbar2 />}
            <div className={classes.mainContainer}>
                <div className={classes.mainContent} style={{ justifyContent: !user && 'center' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main