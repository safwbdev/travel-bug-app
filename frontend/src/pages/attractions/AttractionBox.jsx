import React from 'react'
import classes from './AttractionBox.module.scss'

const AttractionBox = ({ data }) => {
    return (
        <div className={classes.attractionBox}>
            <div className={classes.image}>
                <img src={data.photos.length > 0 ? data.photos[0] : "https://placehold.co/800x800?text=Image+Not+Found"} alt="" />
            </div>
            <div className={classes.content}>
                <h2>{data.title}</h2>
                <span className={classes.location}>{data.location} | {data.city}</span>
                <p>{data.desc}</p>

                <div className={classes.footer}>
                    <span className={classes.type}>{data.type}</span>
                    <p className={data.price > 0 ? classes.price : classes.free}>{data.price > 0 ? `$${data.price}` : 'FREE'}</p>
                </div>
            </div>
        </div>
    )
}

export default AttractionBox