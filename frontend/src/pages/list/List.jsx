import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import classes from './List.module.scss'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'

const List = () => {
    const { state } = useLocation();
    const [destination, setDestination] = useState(state.destination)
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState(state.date)
    const [options, setOptions] = useState(state.options)
    return (
        <div>
            <Navbar />
            <Header type={'list'} />
            <div className={classes.list}>
                <div className={classes.listContainer}>
                    <div className={classes.listWrapper}>
                        <div className={classes.listSearch}>
                            <h1 className={classes.listTitle}>Search</h1>
                            <div className={classes.listItem}>
                                <label>Destination</label>
                                <input type="text" placeholder={destination} />
                            </div>
                            <div className={classes.listItem}>
                                <label>Check-in Date</label>
                                <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && (<DateRange
                                    onChange={item => setDate([item.selection])}
                                    ranges={date}
                                    minDate={new Date()}
                                />)}
                            </div>
                            <div className={classes.listItem}>
                                <label>Options</label>
                                <div className={classes.listOptions}>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Min price <small>per night</small>
                                        </span>
                                        <input type="number" className={classes.listOptionInput} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Max price <small>per night</small>
                                        </span>
                                        <input type="number" className={classes.listOptionInput} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Adult
                                        </span>
                                        <input
                                            type="number"
                                            min={1}
                                            className={classes.listOptionInput}
                                            placeholder={options.adult} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Children
                                        </span>
                                        <input
                                            type="number"
                                            min={0}
                                            className={classes.listOptionInput}
                                            placeholder={options.children} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Rooms
                                        </span>
                                        <input
                                            type="number"
                                            min={1}
                                            className={classes.listOptionInput}
                                            placeholder={options.room} />
                                    </div>
                                </div>
                            </div>
                            <button>Search</button>
                        </div>
                        <div className={classes.listResult}>
                            {[...Array(25)].map(() => (<SearchItem />))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List