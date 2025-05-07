import React, { useState } from 'react'
import classes from './CarSearch.module.scss'
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CarSearch = () => {
    const [openDate, setOpenDate] = useState(false)
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
    const [endTime, setEndTime] = useState({ h: "22", m: "30" })


    const handleStartHour = (e) => {
        const { value } = e.target;
        setStartTime({ h: value, m: startTime.m })


    }
    const handleStartMinute = (e) => {
        const { value } = e.target;
        setStartTime({ h: startTime.h, m: value })
    }

    const handleEndHour = (e) => {
        const { value } = e.target;
        setEndTime({ h: value, m: endTime.m })
    }
    const handleEndMinute = (e) => {
        const { value } = e.target;
        setEndTime({ h: endTime.h, m: value })
    }


    const handleSearch = () => {
        const data = {
            location: location,
            startDate: dates[0].startDate,
            endDate: dates[0].endDate,
            startTime: startTime.h + startTime.m,
            endTime: endTime.h + endTime.m,
        }
        console.log("SEND CAR RENTAL: ", data);
    }


    const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    const minutes = ["00", "15", "30", "45"];
    return (
        <div className={classes.headerSearch}>
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
                    className={classes.dateWindow}
                    minDate={new Date()}
                />)}
            </div>
            <div className={classes.headerSearchItem}>
                <FaClock className={classes.headerIcon} />
                <span onClick={() => setOpenTime(!openTime)} className={classes.headerSearchText}>
                    {`START TIME: ${startTime.h}:${startTime.m}  | END TIME: ${endTime.h}:${endTime.m}`}
                </span>
                {openTime && (
                    <div className={classes.optionsWindow}>
                        <div className={classes.options}>
                            <div className={classes.optionItem}>
                                <div className={classes.optionCounter}>
                                    <span className={classes.optionText}>Start Date</span>
                                    <select name="startH" onChange={handleStartHour}>
                                        {hours.map((h) => (<option value={h} key={h} selected={h === startTime.h}>{h}</option>))}
                                    </select>
                                    <select name="startM" onChange={handleStartMinute}>
                                        {minutes.map((h) => (<option value={h} key={h} selected={h === startTime.m}>{h}</option>))}
                                    </select>
                                </div>
                                <div className={classes.optionCounter}>
                                    <span className={classes.optionText}>End Date</span>
                                    <select name="endH" onChange={handleEndHour}>
                                        {hours.map((h) => (<option value={h} key={h} selected={h === endTime.h}>{h}</option>))}
                                    </select>
                                    <select name="endM" onChange={handleEndMinute}>
                                        {minutes.map((h) => (<option value={h} key={h} selected={h === endTime.m}>{h}</option>))}
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
                <button className={classes.headerButton} onClick={handleSearch}>Search</button>
            </div>
        </div>
    )
}

export default CarSearch