import React, { useContext } from 'react'
import classes from './Featured.module.scss'
import useFetch from '../../hooks/useFetch'
import { amsterdamImage, berlinImage, parisImage, tokyoImage } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Featured = () => {

  const { data, loading, error } = useFetch("/api/hotels/countByCity?cities=berlin,tokyo,paris,amsterdam");
  const navigate = useNavigate()
  const { dispatch, dates, options } = useContext(SearchContext)

  const featuredArray = [
    { title: 'berlin', img: berlinImage },
    { title: 'tokyo', img: tokyoImage },
    { title: 'paris', img: parisImage },
    { title: 'amsterdam', img: amsterdamImage },
  ]

  const type = ["hotel", "apartment", "resort", "villa", "cabin"]

  const linkFeature = (destination) => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options, type }
    })

    navigate("/hotels", { state: { destination, dates, options, type } })
  }


  const FeaturedBox = ({ feature, id }) => (
    <div className={classes.featuredItem} onClick={() => linkFeature(feature.title)}>
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
        {featuredArray.map((feature, index) => (<FeaturedBox key={index} feature={feature} id={index} />))}
      </>)}
    </div>
  )
}

export default Featured