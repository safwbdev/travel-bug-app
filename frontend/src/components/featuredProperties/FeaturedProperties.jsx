import React from 'react'
import classes from './FeaturedProperties.module.scss'
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("/api/hotels?featured=true&limit=4");

    return (
        <div className={classes.featuredProperties}>
            {loading ? "Loading" : (
                <>
                    {data.map((item, index) => (
                        <div className={classes.featuredPropertiesItem} key={index}>
                            <img
                                className={classes.featuredPropertiesImage}
                                src={item.photos.length > 0 ? item.photos[0] : "https://placehold.co/400x400?text=Image+Not+Found"}
                                alt="" />
                            <span className={classes.featuredPropertiesName}>{item.name}</span>
                            <span className={classes.featuredPropertiesCity}>{item.city}</span>
                            <span className={classes.featuredPropertiesPrice}>Starting from ${item.cheapestPrice}</span>
                            {item.rating && (
                                <div className={classes.featuredPropertiesRating}>
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>)}
                        </div>))}
                </>
            )}
        </div>
    )
}

export default FeaturedProperties