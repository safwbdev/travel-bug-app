import React from 'react'
import classes from './SearchItem.module.scss'
import { Link } from 'react-router-dom'

const SearchItem = ({ item }) => {
    return (
        <div className={classes.searchItem}>
            <img
                src={item.photos > 0 ? item.photos[0] : "https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o="}
                alt=""
                className={classes.searchItemImage} />
            <div className={classes.searchItemDesc}>
                <h1 className={classes.searchItemTitle}>{item.name}</h1>
                <span className={classes.searchItemDistance}>{item.distance}m from city center</span>
                <span className={classes.searchItemTaxiOp}>Free airport taxi</span>
                <span className={classes.searchItemSubtitle}>Studio Apartment with Air Conditioning</span>
                <span className={classes.searchItemFeatures}>{item.desc}</span>
                <span className={classes.searchItemCancelOp}>Free cancellation</span>
                <span className={classes.searchItemCancelOpSubtitle}>You can cancel later, so lock in this great price today!</span>
            </div>
            <div className={classes.searchItemDetails}>
                {item.rating && (<div className={classes.searchItemRating}>
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>)}
                <div className={classes.searchItemDetailTexts}>
                    <span className={classes.searchItemPrice}>${item.cheapestPrice}</span>
                    <span className={classes.searchItemTaxOp}>Includes taxes and fees</span>
                    <Link to={`${item._id}`}>
                        <button className={classes.searchItemCheckButton}>See availablity</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem