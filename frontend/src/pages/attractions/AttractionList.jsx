import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import classes from './AttractionList.module.scss'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { API_URL } from '../../routes'
import AttractionBox from './AttractionBox'

const AttractionList = () => {
    const { dates, city, options, type } = useContext(SearchContext)
    const { state } = useLocation();
    const [destination, setDestination] = useState(state.destination || city)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)
    const [types, setTypes] = useState(state.type || type)

    const eventType = [
        "event",
        "concert",
        "zoo",
        "museum",
        "exhibit",
        "tours",
        "festival",
    ]

    const { data, loading, error, reFetch } = useFetch(`${API_URL}/api/attractions`);

    const handleClick = () => {
        reFetch()
    }

    const handleTypes = (e) => {
        if (types.includes(e.target.value)) {
            setTypes(types.filter(tp => tp !== e.target.value))

        } else {
            setTypes(old => [...old, e.target.value])
        }
    }

    console.log(data);


    return (
        <div>
            <Navbar />
            <div className={classes.list}>
                <div className={classes.listContainer}>
                    <div className={classes.listWrapper}>
                        <div className={classes.listSearch}>
                            <h1 className={classes.listTitle}>Search</h1>
                            <div className={classes.listItem}>
                                <label>Attractions</label>
                                <input type="text" placeholder={destination} />
                            </div>
                            {/* <div className={classes.listItem}>
                                <label>Check-in Date</label>
                                <span onClick={() => setOpenDate(!openDate)}>{`${format(calDates.startDate, "MM/dd/yyyy")} to ${format(calDates.endDate, "MM/dd/yyyy")} `}</span>
                                {openDate && (<DateRange
                                    onChange={item => setCalDates([item.selection])}
                                    ranges={dates}
                                    minDate={new Date()}
                                />)}
                            </div> */}
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
                                    {eventType.map((acco, index) => (
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
                        <div className={classes.listResult}>
                            {loading ? "Loading" : (<>
                                {data.map(item => (<AttractionBox data={item} key={item._id} />))}
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttractionList