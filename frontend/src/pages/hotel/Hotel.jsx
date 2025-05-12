import React, { useContext, useEffect, useState } from 'react'
import classes from './Hotel.module.scss'
import Navbar from '../../components/navbar/Navbar'
import { FaCircleArrowLeft, FaCircleArrowRight, FaCircleXmark, FaLocationDot } from 'react-icons/fa6'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Booking from '../../components/booking/Booking'
import parse from 'html-react-parser';

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
        const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
        const diffDays = Math.ceil(timeDiff / ms_per_day);
        return diffDays
    }

    const days = calculateDayDifference(dates[0].endDate, dates[0].startDate);

    const handleBook = () => {
        if (user) {
            setOpenBook(true)
        } else {
            navigate("/login")
        }
    }

    const ImageSlider = () => (
        <div className={classes.slider}>
            <FaCircleXmark className={classes.close} onClick={() => setOpenSlide(false)} />
            <FaCircleArrowLeft className={classes.arrow} onClick={() => handleMove("l")} />
            <div className={classes.sliderWrapper}>
                {data?.photos && (<img src={data?.photos[slideIndex]} alt="" className={classes.sliderImage} />)}
            </div>
            <FaCircleArrowRight className={classes.arrow} onClick={() => handleMove("r")} />
        </div>
    )


    return (
        <div>
            <Navbar />
            {loading ? "Loading" : (<div className={classes.hotelContainer}>
                {openSlide && <ImageSlider />}
                <div className={classes.hotelWrapper}>
                    <span className={classes.hotelPriceHighlight}>
                        Book over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className={classes.header}>
                        <div className={classes.gallery}>
                            <div className={classes.hotelMainImage}>
                                {data?.photos && (<img src={data?.photos[0]} alt="" onClick={() => handleOpen(0)} />)}
                            </div>
                            <div className={classes.hotelImages}>
                                {data.photos?.map((photo, index) => (
                                    <div className={classes.hotelImageWrapper} key={index}>
                                        <img src={photo} className={classes.hotelImage} onClick={() => handleOpen(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.hotelRightSection}>
                            <h1 className={classes.hotelTitle}>{data?.name}</h1>
                            <div className={classes.hotelDetailsPrice}>
                                <div className={classes.hotelAddress}>
                                    <FaLocationDot />
                                    <span >{data.address}</span>
                                </div>
                                <span className={classes.hotelDistance}>{data.distance}m from city centre</span>
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>Located in the heart of <span className={classes.city}>{data.city}</span>, this property has an excellent location score of 9.8!</span>
                                <h2><b>${days * data?.cheapestPrice * options.room}</b> ({days + 1}D{days}N)</h2>
                                <button onClick={handleBook}>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.hotelDetails}>
                        <div className={classes.hotelDetailsTexts}>
                            <div className={classes.hotelTitle}>{data.title}</div>
                            <div className={classes.hotelDesc}>{data.desc && parse(data.desc.toString())}</div>
                        </div>
                    </div>
                    <div className={classes.hotelFooter}>
                        <button className={classes.bookNow} onClick={handleBook}>Reserve or Book Now!</button>
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