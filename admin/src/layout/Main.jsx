import React, { useContext } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import classes from './Main.module.scss'
import { Navbar, Sidebar } from '../components';
import { AuthContext } from '../context/AuthContext';

const Main = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className={classes.main}>
            {user && <Sidebar />}
            <div className={classes.mainContainer}>
                {user && <Navbar />}
                <div className={classes.mainContent} style={{ justifyContent: !user && 'center' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main