import React, { useState } from 'react'
import classes from './FlightSearch.module.scss'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../../context/SearchContext'
import { FaBed, FaCalendarDays, FaPerson } from "react-icons/fa6";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'


const FlightSearch = () => {
    const [openDate, setOpenDate] = useState(false)
    const [oneWay, setOneWay] = useState(true);
    const [openOptions, setOpenOptions] = useState(false)
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        type: "Economy"
    })
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === '+' ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const changeClass = (e) => {
        setOptions(prev => {
            return {
                ...prev,
                type: e.target.value,
            }
        })
    }


    const handleSearch = () => { }


    return (
        <div className={classes.headerSearch}>
            <div className={classes.headerRow}>
                <div className={classes.headerSearchItem}>
                    <div
                        className={`${classes.trip} ${oneWay && classes.active}`}
                        onClick={() => setOneWay(true)}>
                        Direct
                    </div>
                    <div
                        className={`${classes.trip} ${!oneWay && classes.active}`}
                        onClick={() => setOneWay(false)}>
                        Return
                    </div>
                </div>
                <div className={classes.headerSearchItem}>
                    <FaPlaneDeparture className={classes.headerIcon} />
                    <input
                        type="text"
                        placeholder="From"
                        className={classes.headerSearchInput}
                        onChange={(e) => setDestination(e.target.value)} />
                </div>
                <div className={classes.headerSearchItem}>
                    <FaPlaneArrival className={classes.headerIcon} />
                    <input
                        type="text"
                        placeholder="To"
                        className={classes.headerSearchInput}
                        onChange={(e) => setDestination(e.target.value)} />
                </div>
            </div>

            <div className={classes.headerRow}>
                <div className={classes.headerSearchItem}>
                    <FaCalendarDays className={classes.headerIcon} />
                    <span
                        className={classes.headerSearchText}
                        onClick={() => setOpenDate(!openDate)}
                    >
                        {oneWay ? `${format(dates[0].startDate, "MM/dd/yyyy")}` : `${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                    </span>
                    {openDate && (<DateRange
                        editableDateInputs={true}
                        onChange={item => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className={classes.dateWindow}
                        minDate={new Date()}
                    />)}
                </div>
                <div className={classes.headerSearchItem}>
                    <FaPerson className={classes.headerIcon} />
                    <span onClick={() => setOpenOptions(!openOptions)} className={classes.headerSearchText}>{`${options.adult} Adult | ${options.children} Children | ${options.type}`}</span>
                    {openOptions && (
                        <div className={classes.optionsWindow}>
                            <div className={classes.options}>
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
                                    <select onChange={changeClass} value={options.type} style={{ borderRadius: '5px', width: '100%', fontSize: '1em', padding: '0.2em' }}>
                                        <option value="Economy">Economy</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>
                            </div>
                        </div>)}
                </div>


                <div className={classes.headerSearchItem}>
                    <button className={classes.headerButton} onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default FlightSearch