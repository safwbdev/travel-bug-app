import React, { useContext, useState } from 'react'
import classes from './Booking.module.scss'
import { FaCircleXmark } from 'react-icons/fa6'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../routes'

const Booking = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`${API_URL}/api/hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);


    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime().toString());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };

    const alldates = getDatesInRange(dates.startDate, dates.endDate);

    const navigate = useNavigate();

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => {
            return alldates.includes(date);
        });
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
    }

    const handleBook = async () => {
        try {
            await Promise.all(selectedRooms.map((roomId) => {
                const res = axios.put(`${API_URL}/api/rooms/availabilty/${roomId}`, { dates: alldates })
                return res.data;
            }))
            setOpen(false)
            navigate("/")
        } catch (err) {

        }
    }

    return (
        <div className={classes.booking}>
            <div className={classes.bookingContainer}>
                <FaCircleXmark className={classes.bookingClose} onClick={() => setOpen(false)} />
                <span>Select your Rooms:</span>
                {data.map(item => (
                    <div className={classes.bookingItem} key={item._id}>
                        <div className={classes.bookingItemInfo}>
                            <div className={classes.bookingTitle}>{item.title}</div>
                            <div className={classes.bookingDesc}>{item.desc}</div>
                            <div className={classes.bookingMax}>
                                <b>Max People: {item.maxPeople}</b>
                            </div>
                            <div className={classes.bookingPrice}>${item.price}</div>
                        </div>
                        <div className={classes.bookingSelectRooms}>
                            {item.roomNumbers.map(roomNumber => (
                                <div className={classes.bookingRoom} key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input type='checkbox' value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleBook} className={classes.bookingButton}>
                    Reserve Now!
                </button>
            </div>
        </div>
    )
}

export default Booking