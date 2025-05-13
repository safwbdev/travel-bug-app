import React, { useState } from 'react'
import classes from './AttractionSearch.module.scss'
import { MdLocalActivity } from "react-icons/md";

const AttractionSearch = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const data = { query: query };
        console.log("SEND ATTRACTIONS: ", data);
    }



    return (
        <div className={classes.headerSearch}>
            <div className={classes.headerSearchItem}>
                <MdLocalActivity className={classes.headerIcon} />
                <input
                    type="text"
                    placeholder="Search for tors & activities"
                    className={classes.headerSearchInput}
                    onChange={(e) => setQuery(e.target.value)} />
                <button className={classes.headerButton} onClick={handleSearch} disabled>Search</button>
            </div>
        </div>
    )
}

export default AttractionSearch