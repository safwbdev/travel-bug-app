import React, { useContext, useState } from 'react'
import classes from './Header.module.scss'
import { FaBed, FaCar, FaPlane, FaTaxi } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthContext';
import { bannerImage } from '../../assets';
import {
    HotelSearch,
    FlightSearch,
    CarSearch,
    AttractionSearch,
    TaxiSearch,
} from '../forms';
import { Link } from 'react-router-dom';


const Header = ({ type }) => {

    const [currentForm, setCurrentForm] = useState(0)

    const { user } = useContext(AuthContext)

    const tabs = [
        { label: "Hotels", icon: (<FaBed />) },
        { label: "Flights", icon: (<FaPlane />) },
        { label: "Rentals", icon: (<FaCar />) },
        { label: "Attractions", icon: (<FaBed />) },
        { label: "Taxis", icon: (<FaTaxi />) },
    ]

    const HeaderForm = () => {
        switch (currentForm) {
            case 0:
                return <HotelSearch />
            case 1:
                return <FlightSearch />
            case 2:
                return <CarSearch />
            case 3:
                return <AttractionSearch />
            case 4:
                return <TaxiSearch />
            default:
                return null;
        }
    }

    return (
        <div className={classes.header} style={{
            background: `url(${bannerImage})`,
            backgroundSize: 'cover'
        }}>
            <div className={`${classes.headerContainer} ${type === 'list' && classes.listMode}`}>
                {type !== 'list' && (
                    <>
                        <h1 className={classes.headerTitle}>
                            Welcome to Your Gateway to Adventure
                        </h1>
                        <p className={classes.headerDesc}>
                            Ready to explore the world? Whether you're planning a relaxing beach getaway, an exciting city escape, or a once-in-a-lifetime adventure, we've got you covered. Our easy-to-use platform helps you find the best deals on flights, hotels, tours, and more — all in one place.
                            Book with confidence, travel with ease. Your journey starts here.
                        </p>
                        {/* NOTE: UNHIDE ON MOBILE IN FUTURE */}
                        {!user && (
                            <div className={classes.headerButtonRow}>
                                <Link to={'/login'}>
                                    <button className={classes.headerButton}>Sign In / Register & Book Now</button>
                                </Link>
                            </div>)}
                        <div className={classes.headerList}>
                            {tabs.map((tab, index) => (
                                <div key={index} onClick={() => setCurrentForm(index)} className={`${classes.headerListItem} ${currentForm === index && classes.active}`}>
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className={classes.headerForm}>
                            <HeaderForm />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header