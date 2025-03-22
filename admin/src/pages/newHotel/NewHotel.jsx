import React, { useState } from 'react'
import classes from './NewHotel.module.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from '../../formSource';
import { Sidebar, Navbar } from '../../components'
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { HOTEL_PATH, IMG_UPLOAD_PATH, ROOM_PATH } from '../../routes';

const NewHotel = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const { data, loading, error } = useFetch(ROOM_PATH);

    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value)
        setRooms(value);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(IMG_UPLOAD_PATH, data);
                    const { url } = uploadRes.data;
                    return url
                }));

            const newHotel = {
                ...info, rooms, photos: list
            };

            await axios.post(HOTEL_PATH, newHotel);
        } catch (err) {

        }
    }


    return (
        <div className={classes.new}>
            <Sidebar />
            <div className={classes.newContainer}>
                <Navbar />
                <div className={classes.top}>
                    <h1>Add New Hotel</h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.left}>
                        <img
                            src={
                                files
                                    ? URL.createObjectURL(files[0])
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className={classes.right}>
                        <form>
                            <div className={classes.formInput}>
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className={classes.icon} />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>
                            {hotelInputs.map((input) => (
                                <div className={classes.formInput} key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleChange} />
                                </div>
                            ))}
                            <div className={classes.formInput}>
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className={classes.selectRooms}>
                                <label>Rooms</label>
                                <select id="featured" onChange={handleSelect} multiple>
                                    {loading ? 'loading' : data && data.map((room) => (<option key={room._id} value={room._id}>{room.title}</option>))}
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

export default NewHotel