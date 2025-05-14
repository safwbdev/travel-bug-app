import React, { useContext, useEffect, useState } from 'react'
import classes from './AttractionPage.module.scss'
import Navbar from '../../components/navbar/Navbar'
import { FaCircleArrowLeft, FaCircleArrowRight, FaCircleXmark, FaLocationDot } from 'react-icons/fa6'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import parse from 'html-react-parser';
import { API_URL } from '../../routes'

const AttractionPage = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const { data, loading, error } = useFetch(`${API_URL}/api/attractions/${id}`);

    // FIXME: dtaes when visiting from list or home
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
            {loading ? "Loading" : (<div className={classes.attractionContainer}>
                {openSlide && <ImageSlider />}
                <div className={classes.attractionWrapper}>
                    <div className={classes.header}>
                        <div className={classes.gallery}>
                            <div className={classes.attractionMainImage}>
                                {data?.photos && (<img src={data?.photos[0] || "https://placehold.co/800x800?text=Image+Not+Found"} alt="" onClick={() => handleOpen(0)} />)}
                            </div>
                            <div className={classes.attractionImages}>
                                {data.photos?.map((photo, index) => (
                                    <div className={classes.attractionImageWrapper} key={index}>
                                        <img src={photo} className={classes.attractionImage} onClick={() => handleOpen(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.attractionRightSection}>
                            <h1 className={classes.attractionTitle}>{data?.title}</h1>
                            <div className={classes.attractionDetailsPrice}>
                                <div className={classes.detailHeader}>
                                    <div className={classes.attractionAddress}>
                                        <FaLocationDot />
                                        <span>{data.location} | {data.city}</span>
                                    </div>
                                    <span className={classes.type}>{data.type}</span>
                                </div>
                                <div className={classes.footer}>
                                    <span className={data.price > 0 ? classes.price : classes.free}>{data.price > 0 ? `$${data.price}` : 'FREE'}</span>

                                </div>
                                <button onClick={handleBook}>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.attractionDetails}>
                        <div className={classes.attractionDetailsTexts}>
                            <div className={classes.attractionDesc}>{data.desc && parse(data.desc.toString())}</div>
                        </div>
                    </div>
                    <div className={classes.attractionFooter}>
                        <button className={classes.bookNow} onClick={handleBook}>Reserve or Book Now!</button>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>)}
        </div>
    )
}

export default AttractionPage