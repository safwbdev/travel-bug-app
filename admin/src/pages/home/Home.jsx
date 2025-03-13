import React from 'react'
import classes from './Home.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
    return (
        <div className={classes.home}>
            <Sidebar />
            <div className={classes.homeContainer}>
                <Navbar />
                <div className={classes.homeContent}>
                    Home
                </div>
            </div>
        </div>
    )
}

export default Home