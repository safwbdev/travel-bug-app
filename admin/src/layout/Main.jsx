import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import classes from './Main.module.scss'
import { Navbar, Sidebar } from '../components';

const Main = () => {
    return (
        <div className={classes.main}>
            <Sidebar />
            <div className={classes.mainContainer}>
                <Navbar />
                <div className={classes.mainContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Main