import React, { useState } from 'react'
import classes from './AttractionSearch.module.scss'
import { MdLocalActivity } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';

const AttractionSearch = () => {
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const { dispatch } = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
            payload: { query }
        })
        navigate("/attractions", { state: { query } })
    }

    return (
        <div className={classes.headerSearch}>
            <div className={classes.headerSearchItem}>
                <MdLocalActivity className={classes.headerIcon} />
                <input
                    type="text"
                    placeholder="Search for tours & activities"
                    className={classes.headerSearchInput}
                    onChange={(e) => setQuery(e.target.value)} />
                <button className={classes.headerButton} onClick={handleSearch} >Search</button>
            </div>
        </div>
    )
}

export default AttractionSearch