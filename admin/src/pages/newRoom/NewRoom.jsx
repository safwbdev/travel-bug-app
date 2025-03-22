import React, { useState } from 'react'
import classes from './NewRoom.module.scss'
import { Sidebar, Navbar } from '../../components'
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { HOTEL_PATH, ROOM_PATH } from '../../routes';

const NewRoom = () => {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const { data, loading, error } = useFetch(HOTEL_PATH);

    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`${ROOM_PATH}/${hotelId}`, { ...info, roomNumbers })
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <div className={classes.new}>
            <Sidebar />
            <div className={classes.newContainer}>
                <Navbar />
                <div className={classes.top}>
                    <h1>Add new Room</h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.right}>
                        <form>
                            {roomInputs.map((input) => (
                                <div className={classes.formInput} key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                                </div>
                            ))}
                            <div className={classes.formInput} >
                                <label>Rooms</label>
                                <textarea onChange={e => setRooms(e.target.value)} placeholder='Give comma between room numbers' />
                            </div>
                            <div className={classes.formInput} >
                                <label>Choose Hotel</label>
                                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                    {loading ? "Loading" : data && data.map((hotel) => (<option value={hotel._id} key={hotel._id}>{hotel.name}</option>))}
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom