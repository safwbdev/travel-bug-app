import React from 'react'
import classes from './Featured.module.scss'

const Featured = () => {
  return (
    <div className={classes.featured}>
      <div className={classes.featuredItem}>
        <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
        <div className={classes.featuredTitles}>
          <h1>Dublin</h1>
          <h2>123 Properties</h2>
        </div>
      </div>
      <div className={classes.featuredItem}>
        <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
        <div className={classes.featuredTitles}>
          <h1>Austin</h1>
          <h2>456 Properties</h2>
        </div>
      </div>
      <div className={classes.featuredItem}>
        <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
        <div className={classes.featuredTitles}>
          <h1>Reno</h1>
          <h2>789 Properties</h2>
        </div>
      </div>
      <div className={classes.featuredItem}>
        <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
        <div className={classes.featuredTitles}>
          <h1>Houston</h1>
          <h2>101 Properties</h2>
        </div>
      </div>
    </div>
  )
}

export default Featured