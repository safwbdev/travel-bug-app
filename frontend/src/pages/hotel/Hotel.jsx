import React, { useState } from 'react'
import classes from './Hotel.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FaCircleArrowLeft, FaCircleArrowRight, FaCircleXmark, FaLocationDot } from 'react-icons/fa6'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Hotel = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [openSlide, setOpenSlide] = useState(false)
    const photos = [
        { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501702949.jpg?k=356fe444419e750021da7c5b93b77bc5781c9a92594ef62097dd5615cc80714e&o=&hp=1" },
        { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501703164.jpg?k=f33c2c51120aab3d050e70885c70a9890476058ea32f2c17308e26a2d9eea767&o=&hp=1" },
        { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/433567907.jpg?k=7cbc76fa22365727b0398cd5ec2d24f378d377b98f3676ab9ef12a674263c76a&o=&hp=1" },
        { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/502040268.jpg?k=124e83e6e00ee846a6bdff8c285a1053bbb6da4e43b340d2bcad50b4f7fcc4bb&o=&hp=1" },
        { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/433567974.jpg?k=a9850832837a6bc79eecdf1957d1f3a7c1afdf88f09f354bfa642ee7d84d5f9f&o=&hp=1" },
        { src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/433567990.jpg?k=b1a18760b99762e180ac6c67d048bbb46807cd4f89cc9e162e77c8ae87a38679&o=&hp=1" },
    ];

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

    return (
        <div>
            <Navbar />
            <Header type={"list"} />
            <div className={classes.hotelContainer}>
                {openSlide && (
                    <div className={classes.slider}>
                        <FaCircleXmark className={classes.close} onClick={() => setOpenSlide(false)} />
                        <FaCircleArrowLeft className={classes.arrow} onClick={() => handleMove("l")} />
                        <div className={classes.sliderWrapper}>
                            <img src={photos[slideIndex].src} alt="" className={classes.sliderImage} />
                        </div>
                        <FaCircleArrowRight className={classes.arrow} onClick={() => handleMove("r")} />
                    </div>)}
                <div className={classes.hotelWrapper}>
                    <button className={classes.bookNow}>Reserve or Book Now!</button>
                    <h1 className={classes.hotelTitle}>Hard Rock Hotel</h1>
                    <div className={classes.hotelAddress}>
                        <FaLocationDot />
                        <span >Elton Street 123 New York</span>
                    </div>
                    <span className={classes.hotelDistance}>Elton Street 123 New York</span>
                    <span className={classes.hotelPriceHighlight}>Book over $114 at this property and get a free airport taxi</span>
                    <div className={classes.hotelImages}>
                        {photos.map((photo, index) => (
                            <div className={classes.hotelImageWrapper}>
                                <img src={photo.src} className={classes.hotelImage} onClick={() => handleOpen(index)} />
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
                            <h1>Perfect for a 9-night stay!</h1>
                            <span>Located in the heart of New York, this property has an excellent location score of 9.8!</span>
                            <h2>
                                <b>$945</b> (9 nights)
                            </h2>
                            <button>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Hotel