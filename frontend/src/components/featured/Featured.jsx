import React from 'react'
import classes from './Featured.module.scss'
import useFetch from '../../hooks/useFetch'

const Featured = () => {

  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=berlin,tokyo,paris,amsterdam");

  return (
    <div className={classes.featured}>
      {loading ? "Loading" : (<>
        <div className={classes.featuredItem}>
          <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
          <div className={classes.featuredTitles}>
            <h1>Berlin</h1>
            <h2>{data[0]} Properties</h2>
          </div>
        </div>
        <div className={classes.featuredItem}>
          <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
          <div className={classes.featuredTitles}>
            <h1>Tokyo</h1>
            <h2>{data[1]} Properties</h2>
          </div>
        </div>
        <div className={classes.featuredItem}>
          <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
          <div className={classes.featuredTitles}>
            <h1>Paris</h1>
            <h2>{data[2]} Properties</h2>
          </div>
        </div>
        <div className={classes.featuredItem}>
          <img className={classes.featuredImage} src="https://cf.bstatic.com/xdata/images/hotel/square600/48746534.webp?k=5d55617da818d4ac5ff605f4edda73ac132d013abda679b82a18334f5c07453c&o=" alt="" />
          <div className={classes.featuredTitles}>
            <h1>Amsterdam</h1>
            <h2>{data[3]} Properties</h2>
          </div>
        </div>
      </>)}
    </div>
  )
}

export default Featured