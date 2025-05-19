import React, { forwardRef, useContext, useState } from 'react'
import classes from './HotelSearch.module.scss'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../../context/SearchContext'
import { FaBed, FaCalendarDays, FaPerson } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HotelSearch = () => {
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
    const type = ["hotel", "apartment", "resort", "villa", "cabin"]

    const pickRange = (dates) => {
        const [start, end] = dates;
        setDates([{
            startDate: start,
            endDate: end,
        }])
    };

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
        dispatch({
            type: "NEW_SEARCH",
            payload: { destination, dates, options, type }
        })
        navigate("/hotels", { state: { destination, dates, options, type } })
    }

    const RangedDate = forwardRef(
        ({ value, onClick, className }, ref) => (
            <button className={className} onClick={onClick} ref={ref}>
                {value}
            </button>
        ),
    );

    return (
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
                <DatePicker
                    customInput={<RangedDate className={classes.headerSearchText} />}
                    selected={dates[0].startDate}
                    onChange={pickRange}
                    startDate={dates[0].startDate}
                    endDate={dates[0].endDate}
                    monthsShown={2}
                    selectsRange
                />
            </div>
            <div className={classes.headerSearchItem}>
                <FaPerson className={classes.headerIcon} />
                <span onClick={() => setOpenOptions(!openOptions)} className={classes.headerSearchText}>{`${options.adult} Adult | ${options.children} Children | ${options.room} Room`}</span>
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
                        </div>
                    </div>)}
            </div>
            <div className={classes.headerSearchItem}>
                <button className={classes.headerButton} onClick={handleSearch}>Search</button>
            </div>
        </div>
    )
}

export default HotelSearch