import React from 'react'
import classes from './Single.module.scss'
import useFetch from '../../hooks/useFetch'
import { API_URL } from '../../routes'
import {
    hotelInputs, userInputs,
    roomInputs
} from '../../formSource'

const Single = () => {

    const path = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[2];

    const { data, loading } = useFetch(`${API_URL}/${path === 'hotels' ? 'hotels/find' : path}/${id}`);

    const getDataType = () => {
        switch (path) {
            case 'hotels':
                return hotelInputs;
            case 'users':
                return userInputs;
            case 'rooms':
                return roomInputs;
            default:
                return null;
        }
    }
    const displayData = (array) => {

        return array.map((arr) => (
            <div className={classes.descText} key={arr.id}>
                <span>
                    {arr.label}:
                </span>
                {data[arr.id]}</div>
        ))
    }

    return loading ? (<h2>Loading...</h2>) : (
        <div className={classes.newContainer}>
            <div className={classes.top}>
                <h1>{data.name}</h1>
            </div>
            <div className={classes.bottom}>
                {displayData(getDataType())}
            </div>
        </div>
    )
}

export default Single