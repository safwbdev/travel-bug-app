import React, { useContext } from 'react'
import classes from './FeaturedProperties.module.scss'
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { API_URL } from '../../routes';

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch(`${API_URL}/api/hotels/featured`);
    const navigate = useNavigate()
    const { dispatch, dates, options } = useContext(SearchContext)


    const featureLink = (id) => {
        dispatch({
            type: "LINK",
            payload: { dates, options }
        })

        navigate(`/hotels/${id}`, { state: { dates, options } })
    }

    return (
        <div className={classes.featuredProperties}>
            {error ? (<span>Something went wrong. Please try again later</span>) : loading ? "Loading" : (
                <>
                    {data.map((item, index) => (
                        <div className={classes.featuredPropertiesItem} key={index} onClick={() => featureLink(item._id)}>
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
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default FeaturedProperties