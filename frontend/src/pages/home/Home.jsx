import React from 'react'
import classes from './Home.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className={classes.homeContainer}>
                <Featured />
                <PropertyList />
                <FeaturedProperties title={'Trending Accomodations'} />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home