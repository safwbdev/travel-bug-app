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
                <h1 className={classes.homeTitle}>Browse by Property type</h1>
                <PropertyList />
                <h1 className={classes.homeTitle}>Homes guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home