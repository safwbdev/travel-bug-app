import React from 'react'
import classes from './PropertyList.module.scss'
import useFetch from '../../hooks/useFetch';
import {
    hotelImage,
    apartmentImage,
    resortImage,
    villaImage,
    cabinImage,
} from '../../assets';

const PropertyList = () => {
    const { data, loading, error } = useFetch("/api/hotels/countByType");

    const photos = [
        hotelImage,
        apartmentImage,
        resortImage,
        villaImage,
        cabinImage,
    ];

    return (
        <div className={classes.propertyList}>
            {loading ? "Loading" : (
                <>
                    {data && photos.map((photo, index) => (<div className={classes.propertyListItem} key={index}>
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