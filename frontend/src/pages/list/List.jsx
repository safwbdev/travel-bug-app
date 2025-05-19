import React, { forwardRef, useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import classes from './List.module.scss'
import { useLocation } from 'react-router-dom'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { API_URL } from '../../routes'
import { FaCircleXmark } from 'react-icons/fa6'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const List = () => {
    const isMobile = window.innerWidth <= 768 ? true : false;
    const { dates, city, options, type } = useContext(SearchContext)
    const { state } = useLocation();
    const [destination, setDestination] = useState(state.destination || city)
    const [calDates, setCalDates] = useState(state.dates[0] || dates)
    const [searchOptions, setSearchOptions] = useState(state.options || options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)
    const [openSearch, setOpenSearch] = useState(false)
    const [types, setTypes] = useState(state.type || type)

    const accomodation = [
        "hotel",
        "apartment",
        "resort",
        "villa",
        "cabin",
    ]
    /*
    ====
    TODO 
    ====
    - List By
    */

    const { data, loading, error, reFetch } = useFetch(`${API_URL}/api/hotels?min=${min || 0}&max=${max || 999}${destination !== undefined ? `&city=${destination}` : ''}&type=${types.join(",")}`);

    const handleClick = () => {
        setOpenSearch(false)
        reFetch()
    }

    const pickRange = (dates) => {
        const [start, end] = dates;
        setCalDates({
            startDate: start,
            endDate: end,
        })
    };

    const handleTypes = (e) => {
        if (types.includes(e.target.value)) {
            setTypes(types.filter(tp => tp !== e.target.value))

        } else {
            setTypes(old => [...old, e.target.value])
        }
    }

    const RangedDate = forwardRef(
        ({ value, onClick, className }, ref) => (
            <button className={className} onClick={onClick} ref={ref}>
                {value}
            </button>
        ),
    );
    console.log(calDates);


    const SearchBox = () => (
        <>
            <button onClick={() => setOpenSearch(!openSearch)} className={classes.searchWindowButton}>Refine Search</button>
            <div className={`${classes.listSearch} ${openSearch && classes.openWindow}`}>
                <div className={classes.listSearchHeader}>
                    <h1 className={classes.listTitle}>Search</h1>
                    <FaCircleXmark onClick={() => setOpenSearch(false)} />
                </div>

                <div className={classes.listItem}>
                    <label>Destination</label>
                    <input type="text" placeholder={destination} />
                </div>
                <div className={classes.listItem}>
                    <label>Check-in Date</label>
                    <DatePicker
                        customInput={<RangedDate className={classes.headerSearchText} />}
                        selected={calDates.startDate}
                        onChange={pickRange}
                        startDate={calDates.startDate}
                        endDate={calDates.endDate}
                        monthsShown={2}
                        selectsRange
                    />
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
                        <br />
                        {accomodation.map((acco, index) => (
                            <div
                                className={classes.listOptionItem}
                                key={index}
                            >
                                <label htmlFor="checkbox">{acco}</label>
                                <input
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    value={acco}
                                    checked={types && types.includes(acco)}
                                    onChange={handleTypes}
                                />
                            </div>

                        ))}
                    </div>
                </div>
                <button onClick={handleClick}>Search</button>
            </div>
            {openSearch && (<div className={classes.searchBackdrop} onClick={() => setOpenSearch(false)} />)}
        </>
    )

    return (
        <div>
            <Navbar />
            <div className={classes.list}>
                <div className={classes.listContainer}>
                    <div className={classes.listWrapper}>
                        <SearchBox />
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