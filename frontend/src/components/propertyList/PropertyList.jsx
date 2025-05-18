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
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


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

    const PropertyBox = ({ photo, index }) => (
        <div onClick={() => linkTypes([data[index]?.type])} className={classes.propertyListItem} key={index}>
            <img className={classes.propertyListImage} src={photo} alt="" />
            <div className={classes.propertyListTitles}>
                <h1>{data[index]?.type}</h1>
                <h2>{data[index]?.count} {data[index]?.type}s</h2>
            </div>
        </div>
    )

    return (
        <div className={classes.propertySection}>
            <h1 className={classes.propertyTitle}>Browse by Property type</h1>
            <div className={classes.propertyList}>
                {error ? (<span>Something went wrong. Please try again later</span>) : loading ? "Loading" : (
                    <Swiper
                        className={classes.swiper}
                        cssMode={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.3,
                                spaceBetween: 0,
                            },
                            768: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {data && photos.map((photo, index) => (
                            <SwiperSlide key={index}>
                                <PropertyBox key={index} photo={photo} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    )
}

export default PropertyList