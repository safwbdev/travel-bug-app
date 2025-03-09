import React, { useContext, useState } from 'react'
import classes from './Hotel.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FaCircleArrowLeft, FaCircleArrowRight, FaCircleXmark, FaLocationDot } from 'react-icons/fa6'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Booking from '../../components/booking/Booking'

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const { data, loading, error } = useFetch(`/api/hotels/find/${id}`);

    const { dates, options } = useContext(SearchContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [slideIndex, setSlideIndex] = useState(0);
    const [openSlide, setOpenSlide] = useState(false);
    const [openBook, setOpenBook] = useState(false);

    const handleOpen = (i) => {
        setSlideIndex(i);
        setOpenSlide(true)
    }
    const handleMove = (dir) => {
        let newSlideIndex;

        if (dir === "l") {
            newSlideIndex = slideIndex === 0 ? 5 : slideIndex - 1;
        } else {
            newSlideIndex = slideIndex === 5 ? 0 : slideIndex + 1;
        }
        setSlideIndex(newSlideIndex)
    }

    const ms_per_day = 1000 * 60 * 60 * 24;

    const calculateDayDifference = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / ms_per_day);
        return diffDays
    }

    const handleBook = () => {
        if (user) {
            setOpenBook(true)
        } else {
            navigate("/login")
        }
    }
    const days = calculateDayDifference(dates[0].endDate, dates[0].startDate);

    return (
        <div>
            <Navbar />
            <Header type={"list"} />
            {loading ? "Loading" : (<div className={classes.hotelContainer}>
                {openSlide && (
                    <div className={classes.slider}>
                        <FaCircleXmark className={classes.close} onClick={() => setOpenSlide(false)} />
                        <FaCircleArrowLeft className={classes.arrow} onClick={() => handleMove("l")} />
                        <div className={classes.sliderWrapper}>
                            <img src={data?.photos[slideIndex].src} alt="" className={classes.sliderImage} />
                        </div>
                        <FaCircleArrowRight className={classes.arrow} onClick={() => handleMove("r")} />
                    </div>)}
                <div className={classes.hotelWrapper}>
                    <button className={classes.bookNow} onClick={handleBook}>Reserve or Book Now!</button>
                    <h1 className={classes.hotelTitle}>{data?.name}</h1>
                    <div className={classes.hotelAddress}>
                        <FaLocationDot />
                        <span >{data.address}</span>
                    </div>
                    <span className={classes.hotelDistance}>{data.distance}m from city centre</span>
                    <span className={classes.hotelPriceHighlight}>Book over ${data.cheapestPrice} at this property and get a free airport taxi</span>
                    <div className={classes.hotelImages}>
                        {data.photos?.map((photo, index) => (
                            <div className={classes.hotelImageWrapper} key={index}>
                                <img src={photo} className={classes.hotelImage} onClick={() => handleOpen(index)} />
                            </div>
                        ))}
                    </div>
                    <div className={classes.hotelDetails}>
                        <div className={classes.hotelDetailsTexts}>
                            <div className={classes.hotelTitle}>Stay in the Heart of New York</div>
                            <p className={classes.hotelDesc}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe numquam facilis quam exercitationem quasi dolor voluptates corrupti debitis porro. Eveniet corporis ratione quibusdam aliquid obcaecati enim libero commodi odio ducimus.
                            </p>
                        </div>
                        <div className={classes.hotelDetailsPrice}>
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>Located in the heart of New York, this property has an excellent location score of 9.8!</span>
                            <h2>
                                <b>${days * data?.cheapestPrice * options.room}</b> ({days} nights)
                            </h2>
                            <button onClick={handleBook}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>)}
            {openBook && (<Booking setOpen={setOpenBook} hotelId={id} />)}
        </div>
    )
}

export default Hotel