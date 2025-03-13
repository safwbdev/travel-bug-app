import React from 'react'
import classes from './Navbar.module.scss'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes.navbarWrapper}>
                <div className={classes.navbarSearch}>
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <div className={classes.navbarItems}>
                    <div className={classes.navbarItem}>
                        <LanguageOutlinedIcon className="navbarIcon" />
                        English
                    </div>
                    <div className={classes.navbarItem}>
                        <DarkModeOutlinedIcon
                            className={classes.navbarIcon}
                            onClick={() => dispatch({ type: "TOGGLE" })}
                        />
                    </div>
                    <div className={classes.navbarItem}>
                        <FullscreenExitOutlinedIcon className={classes.navbarIcon} />
                    </div>
                    <div className={classes.navbarItem}>
                        <NotificationsNoneOutlinedIcon className={classes.navbarIcon} />
                        <div className={classes.navbarCounter}>1</div>
                    </div>
                    <div className={classes.navbarItem}>
                        <ChatBubbleOutlineOutlinedIcon className={classes.navbarIcon} />
                        <div className={classes.navbarCounter}>2</div>
                    </div>
                    <div className={classes.navbarItem}>
                        <ListOutlinedIcon className={classes.navbarIcon} />
                    </div>
                    <div className={classes.navbarItem}>
                        <img
                            src="https://deadline.com/wp-content/uploads/2024/05/Kabosu-e1716563790195.jpg"
                            alt=""
                            className={classes.navbarAvatar}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar