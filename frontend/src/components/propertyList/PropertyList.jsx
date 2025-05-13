import React, { useContext } from 'react'
import classes from './PropertyList.module.scss'
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import {
    hotelImage,
    apartmentImage,
    resortImage,
    villaImage,
    cabinImage,
} from '../../assets';
import { API_URL } from '../../routes';

const PropertyList = () => {
    const { data, loading, error } = useFetch(`${API_URL}/api/hotels/countByType`);

    const photos = [
        hotelImage,
        apartmentImage,
        resortImage,
        villaImage,
        cabinImage,
    ];

    const navigate = useNavigate();

    const { dispatch, dates, options } = useContext(SearchContext)

    const linkTypes = (type) => {
        dispatch({
            type: "NEW_SEARCH",
            payload: { dates, options, type }
        })
        navigate("/hotels", {
            state: { dates, options, type }
        })
    }

    return (
        <div className={classes.propertyList}>
            {error ? (<span>Something went wrong. Please try again later</span>) : loading ? "Loading" : (
                <>
                    {data && photos.map((photo, index) => (
                        <div onClick={() => linkTypes([data[index]?.type])} className={classes.propertyListItem} key={index}>
                            <img className={classes.propertyListImage} src={photo} alt="" />
                            <div className={classes.propertyListTitles}>
                                <h1>{data[index]?.type}</h1>
                                <h2>{data[index]?.count} {data[index]?.type}s</h2>
                            </div>
                        </div>))}
                </>
            )}
        </div>
    )
}

export default PropertyList