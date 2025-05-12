import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import classes from './List.module.scss'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'

const List = () => {
    const { dates, city, options } = useContext(SearchContext)
    const { state } = useLocation();
    const [destination, setDestination] = useState(state.destination || city)
    const [openDate, setOpenDate] = useState(false)
    const [calDates, setCalDates] = useState(state.dates[0] || dates)
    const [searchOptions, setSearchOptions] = useState(state.options || options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const { data, loading, error, reFetch } = useFetch(`/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    const handleClick = () => {
        reFetch()
    }
    console.log('dates: ', dates);


    return (
        <div>
            <Navbar />
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
                                <span onClick={() => setOpenDate(!openDate)}>{`${format(calDates.startDate, "MM/dd/yyyy")} to ${format(calDates.endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && (<DateRange
                                    onChange={item => setCalDates([item.selection])}
                                    ranges={dates}
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
                                        <input type="number" className={classes.listOptionInput} onChange={(e) => setMin(e.target.value)} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Max price <small>per night</small>
                                        </span>
                                        <input type="number" className={classes.listOptionInput} onChange={(e) => setMax(e.target.value)} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Adult
                                        </span>
                                        <input
                                            type="number"
                                            min={1}
                                            className={classes.listOptionInput}
                                            placeholder={searchOptions.adult} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Children
                                        </span>
                                        <input
                                            type="number"
                                            min={0}
                                            className={classes.listOptionInput}
                                            placeholder={searchOptions.children} />
                                    </div>
                                    <div className={classes.listOptionItem}>
                                        <span className={classes.listOptionText}>
                                            Rooms
                                        </span>
                                        <input
                                            type="number"
                                            min={1}
                                            className={classes.listOptionInput}
                                            placeholder={searchOptions.room} />
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleClick}>Search</button>
                        </div>
                        <div className={classes.listResult}>
                            {loading ? "Loading" : (<>
                                {data.map(item => (<SearchItem item={item} key={item._id} />))}
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List