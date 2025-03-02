import React from 'react'
import classes from './SearchItem.module.scss'

const SearchItem = () => {
    return (
        <div className={classes.searchItem}>
            <img
                src="https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o="
                alt=""
                className={classes.searchItemImage} />
            <div className={classes.searchItemDesc}>
                <h1 className={classes.searchItemTitle}>Tower Street Apartments</h1>
                <span className={classes.searchItemDistance}>550m from city center</span>
                <span className={classes.searchItemTaxiOp}>Free airport taxi</span>
                <span className={classes.searchItemSubtitle}>Studio Apartment with Air Conditioning</span>
                <span className={classes.searchItemFeatures}>Entire Studio | 1 bathroom | 21m2 1 full bed</span>
                <span className={classes.searchItemCancelOp}>Free cancellation</span>
                <span className={classes.searchItemCancelOpSubtitle}>You can cancel later, so lock in this great price today!</span>
            </div>
            <div className={classes.searchItemDetails}>
                <div className={classes.searchItemRating}>
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className={classes.searchItemDetailTexts}>
                    <span className={classes.searchItemPrice}>$123</span>
                    <span className={classes.searchItemTaxOp}>Includes taxes and fees</span>
                    <button className={classes.searchItemCheckButton}>See availablity</button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem