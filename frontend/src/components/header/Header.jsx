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


const Header = ({ type }) => {

    const [currentForm, setCurrentForm] = useState(0)

    const { user } = useContext(AuthContext)

    const tabs = [
        { label: "Hotels", icon: (<FaBed />) },
        { label: "Flights", icon: (<FaPlane />) },
        { label: "Car Rentals", icon: (<FaCar />) },
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
                            Getting you around the world at the best rates!
                        </h1>
                        <p className={classes.headerDesc}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, tempore quod? Dolore, excepturi voluptate? Exercitationem dicta unde deserunt, ipsam facilis minima sequi molestias illum in. Exercitationem placeat nam temporibus quibusdam.
                        </p>
                        {!user && (<button className={classes.headerButton}>Sign In / Register</button>)}
                        <div className={classes.headerList}>
                            {tabs.map((tab, index) => (
                                <div key={index} onClick={() => setCurrentForm(index)} className={`${classes.headerListItem} ${currentForm === index && classes.active}`}>
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </div>
                            ))}
                        </div>
                        <HeaderForm />
                    </>
                )}
            </div>
        </div>
    )
}

export default Header