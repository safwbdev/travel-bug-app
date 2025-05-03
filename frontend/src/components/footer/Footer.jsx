import React from 'react'
import classes from './Footer.module.scss'

const Footer = () => {


    const footerLinks = [
        [
            { url: "/", label: "About Us" },
            { url: "/", label: "Careers" },
            { url: "/", label: "Press & Media" },
            { url: "/", label: "Get a Quote" },
            { url: "/", label: "Join as a Local Guide" }
        ],
        [
            { url: "/", label: "Regions" },
            { url: "/", label: "Cities" },
            { url: "/", label: "Districts" },
            { url: "/", label: "Airports" },
            { url: "/", label: "Hotels" }
        ],
        [
            { url: "/", label: "Tours" },
            { url: "/", label: "Resorts" },
            { url: "/", label: "Car Rentals" },
            { url: "/", label: "Taxis" },
            { url: "/", label: "Shopping" }
        ],
        [
            { url: "/", label: "Travel Visa" },
            { url: "/", label: "Travel Insurance" },
            { url: "/", label: "How to Buy" },
            { url: "/", label: "FAQ" },
            { url: "/", label: "Terms & Conditions" }
        ],
    ]

    return (
        <div className={classes.footer}>
            <div className={classes.footerLists}>
                <ul className={classes.footerList}>
                    {footerLinks[0].map((link) => (<li className={classes.footerListItem}>
                        <a href={link.url}>{link.label}</a>
                    </li>))}
                </ul>
                <ul className={classes.footerList}>
                    {footerLinks[1].map((link) => (<li className={classes.footerListItem}>
                        <a href={link.url}>{link.label}</a>
                    </li>))}
                </ul>
                <ul className={classes.footerList}>
                    {footerLinks[2].map((link) => (<li className={classes.footerListItem}>
                        <a href={link.url}>{link.label}</a>
                    </li>))}
                </ul>
                <ul className={classes.footerList}>
                    {footerLinks[3].map((link) => (<li className={classes.footerListItem}>
                        <a href={link.url}>{link.label}</a>
                    </li>))}
                </ul>
            </div>
            <div className={classes.footetText}>Copyright © 2025 SAFWBDEV</div>
        </div>
    )
}

export default Footer