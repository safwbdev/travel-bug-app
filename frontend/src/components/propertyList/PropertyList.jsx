import React from 'react'
import classes from './PropertyList.module.scss'

const PropertyList = () => {
    return (
        <div className={classes.propertyList}>
            <div className={classes.propertyListItem}>
                <img className={classes.propertyListImage} src="https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=" alt="" />
                <div className={classes.propertyListTitles}>
                    <h1>Hotels</h1>
                    <h2>123 Hotels</h2>
                </div>
            </div>
            <div className={classes.propertyListItem}>
                <img className={classes.propertyListImage} src="https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=" alt="" />
                <div className={classes.propertyListTitles}>
                    <h1>Apartments</h1>
                    <h2>123 Hotels</h2>
                </div>
            </div>
            <div className={classes.propertyListItem}>
                <img className={classes.propertyListImage} src="https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=" alt="" />
                <div className={classes.propertyListTitles}>
                    <h1>Resorts</h1>
                    <h2>123 Hotels</h2>
                </div>
            </div>
            <div className={classes.propertyListItem}>
                <img className={classes.propertyListImage} src="https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=" alt="" />
                <div className={classes.propertyListTitles}>
                    <h1>Villas</h1>
                    <h2>123 Hotels</h2>
                </div>
            </div>
            <div className={classes.propertyListItem}>
                <img className={classes.propertyListImage} src="https://cf.bstatic.com/xdata/images/hotel/square240/647130478.webp?k=622d868070952901f87760d0ee8eafb7a3d69c251131d826489cfacc2c098be4&o=" alt="" />
                <div className={classes.propertyListTitles}>
                    <h1>Cabins</h1>
                    <h2>123 Hotels</h2>
                </div>
            </div>
        </div>
    )
}

export default PropertyList