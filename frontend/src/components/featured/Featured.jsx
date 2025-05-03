import React from 'react'
import classes from './Featured.module.scss'
import useFetch from '../../hooks/useFetch'
import { amsterdamImage, berlinImage, parisImage, tokyoImage } from '../../assets';

const Featured = () => {

  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=berlin,tokyo,paris,amsterdam");

  const featuredArray = [
    { title: 'berlin', img: berlinImage },
    { title: 'tokyo', img: tokyoImage },
    { title: 'paris', img: parisImage },
    { title: 'amsterdam', img: amsterdamImage },
  ]


  const FeaturedBox = ({ feature, id }) => (
    <div className={classes.featuredItem}>
      <img className={classes.featuredImage} src={feature.img} alt="" />
      <div className={classes.featuredTitles}>
        <h1>{feature.title}</h1>
        <h2>{data[id]} Properties</h2>
      </div>
    </div>
  )

  return (
    <div className={classes.featured}>
      {error ? (<span>Something went wrong. Please try again later</span>) : loading ? "Loading" : (<>
        {featuredArray.map((feature, index) => (<FeaturedBox feature={feature} id={index} />))}
      </>)}
    </div>
  )
}

export default Featured