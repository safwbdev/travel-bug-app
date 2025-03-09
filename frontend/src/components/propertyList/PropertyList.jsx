import React from 'react'
import classes from './PropertyList.module.scss'
import useFetch from '../../hooks/useFetch';

const PropertyList = () => {
    const { data, loading, error } = useFetch("/api/hotels/countByType");

    const photos = [
        "https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=",
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