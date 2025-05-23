import React, { forwardRef, useState } from 'react'
import classes from './TaxiSearch.module.scss'
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaxiSearch = () => {
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [location, setLocation] = useState('')
    const [openTime, setOpenTime] = useState(false)
    const [startTime, setStartTime] = useState({ h: "13", m: "00" })

    const handleStartHour = (e) => {
        const { value } = e.target;
        setStartTime({ h: value, m: startTime.m })


    }
    const handleStartMinute = (e) => {
        const { value } = e.target;
        setStartTime({ h: startTime.h, m: value })
    }

    const handleSearch = () => {
        const data = {
            location: location,
            startDate: dates[0].startDate,
            startTime: startTime.h + startTime.m,
        }
        console.log("SEND CAR RENTAL: ", data);
    }

    const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const minutes = ["00", "15", "30", "45"];

    const pickSingle = (date) => {
        setDates([{
            startDate: date,
        }])
    };

    const SingleDate = forwardRef(
        ({ value, onClick, className }, ref) => (
            <button className={className} onClick={onClick} ref={ref}>
                {value}
            </button>
        ),
    );

    return (
        <div className={classes.headerSearch}>
            <div className={classes.headerSearchItem}>
                <FaCalendarDays className={classes.headerIcon} />
                <DatePicker
                    selected={dates[0].startDate}
                    onChange={pickSingle}
                    startDate={dates[0].startDate}
                    monthsShown={2}
                    customInput={<SingleDate className={classes.headerSearchText} />}
                />
            </div>
            <div className={classes.headerSearchItem}>
                <FaClock className={classes.headerIcon} />
                <span onClick={() => setOpenTime(!openTime)} className={classes.headerSearchText}>
                    {`PICKUP TIME: ${startTime.h}:${startTime.m}`}
                </span>
                {openTime && (
                    <div className={classes.optionsWindow}>
                        <div className={classes.options}>
                            <div className={classes.optionItem}>
                                <div className={classes.optionCounter}>
                                    <span className={classes.optionText}>Pickup  Time</span>
                                    <select name="startH" onChange={handleStartHour}>
                                        {hours.map((h) => (<option value={h} key={h} selected={h === startTime.h}>{h}</option>))}
                                    </select>
                                    <select name="startM" onChange={handleStartMinute}>
                                        {minutes.map((h) => (<option value={h} key={h} selected={h === startTime.m}>{h}</option>))}
                                    </select>
                                </div>
                                <button
                                    className={classes.optionCounterButton}
                                    onClick={() => setOpenTime(!openTime)}>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>)}
            </div>
            <div className={classes.headerSearchItem}>
                <FaLocationDot className={classes.headerIcon} />
                <input
                    type="text"
                    placeholder="Location"
                    className={classes.headerSearchInput}
                    onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className={classes.headerSearchItem}>
                <button className={classes.headerButton} onClick={handleSearch} disabled>Search (Work In Progress)</button>
            </div>
        </div>
    )
}

export default TaxiSearch