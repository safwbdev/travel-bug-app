import React, { useContext, useState } from 'react'
import classes from './Header.module.scss'
import { FaBed, FaCalendarDays, FaCar, FaPerson, FaPlane, FaTaxi } from "react-icons/fa6";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


const Header = ({ type }) => {

    const [openDate, setOpenDate] = useState(false)
    const [destination, setDestination] = useState('')
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const { user } = useContext(AuthContext)

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === '+' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const navigate = useNavigate();

    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate("/hotels", { state: { destination, dates, options } })
    }

    return (
        <div className={classes.header}>
            <div className={`${classes.headerContainer} ${type === 'list' && classes.listMode}`}>
                <div className={classes.headerList}>
                    <div className={`${classes.headerListItem} ${classes.active}`}>
                        <FaBed />
                        <span>Stays</span>
                    </div>
                    <div className={classes.headerListItem}>
                        <FaPlane />
                        <span>Flights</span>
                    </div>
                    <div className={classes.headerListItem}>
                        <FaCar />
                        <span>Car Rentals</span>
                    </div>
                    <div className={classes.headerListItem}>
                        <FaBed />
                        <span>Attractions</span>
                    </div>
                    <div className={classes.headerListItem}>
                        <FaTaxi />
                        <span>Taxis</span>
                    </div>
                </div>
                {type !== 'list' && (
                    <>
                        <h1 className={classes.headerTitle}>A lifetime of discounts? It's genius!</h1>
                        <p className={classes.headerDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, tempore quod? Dolore, excepturi voluptate? Exercitationem dicta unde deserunt, ipsam facilis minima sequi molestias illum in. Exercitationem placeat nam temporibus quibusdam.</p>
                        {!user && (<button className={classes.headerButton}>Sign In / Register</button>)}
                        <div className={classes.headerSearch}>
                            <div className={classes.headerSearchItem}>
                                <FaBed className={classes.headerIcon} />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className={classes.headerSearchInput}
                                    onChange={(e) => setDestination(e.target.value)} />
                            </div>
                            <div className={classes.headerSearchItem}>
                                <FaCalendarDays className={classes.headerIcon} />
                                <span
                                    className={classes.headerSearchText}
                                    onClick={() => setOpenDate(!openDate)}
                                >
                                    {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                                </span>
                                {openDate && (<DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className={classes.date}
                                    minDate={new Date()}
                                />)}
                            </div>
                            <div className={classes.headerSearchItem}>
                                <FaPerson className={classes.headerIcon} />
                                <span onClick={() => setOpenOptions(!openOptions)} className={classes.headerSearchText}>{`${options.adult} Adult | ${options.children} Children | ${options.room} Room`}</span>
                                {openOptions && (<div className={classes.options}>
                                    <div className={classes.optionItem}>
                                        <span className={classes.optionText}>Adult</span>
                                        <div className={classes.optionCounter}>
                                            <button
                                                className={classes.optionCounterButton}
                                                onClick={() => handleOption("adult", "-")}
                                                disabled={options.adult <= 1}>
                                                -
                                            </button>
                                            <span className={classes.optionCounterNumber}>{options.adult}</span>
                                            <button className={classes.optionCounterButton} onClick={() => handleOption("adult", "+")}>+</button>
                                        </div>
                                    </div>
                                    <div className={classes.optionItem}>
                                        <span className={classes.optionText}>Children</span>
                                        <div className={classes.optionCounter}>
                                            <button
                                                className={classes.optionCounterButton}
                                                onClick={() => handleOption("children", "-")}
                                                disabled={options.children <= 1}>
                                                -
                                            </button>
                                            <span className={classes.optionCounterNumber}>{options.children}</span>
                                            <button className={classes.optionCounterButton} onClick={() => handleOption("children", "+")}>+</button>
                                        </div>
                                    </div>
                                    <div className={classes.optionItem}>
                                        <span className={classes.optionText}>Room</span>
                                        <div className={classes.optionCounter}>
                                            <button
                                                className={classes.optionCounterButton}
                                                onClick={() => handleOption("room", "-")}
                                                disabled={options.room <= 1}>
                                                -
                                            </button>
                                            <span className={classes.optionCounterNumber}>{options.room}</span>
                                            <button className={classes.optionCounterButton} onClick={() => handleOption("room", "+")}>+</button>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            <div className={classes.headerSearchItem}>
                                <button className={classes.headerButton} onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header