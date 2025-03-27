import React, { useState } from 'react'
import classes from './Edit.module.scss'
import useFetch from '../../hooks/useFetch'
import { API_URL } from '../../routes'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
    hotelInputs, userInputs,
    roomInputs
} from '../../formSource'

const Edit = () => {
    const path = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[3];
    const { data, loading } = useFetch(`${API_URL}/${path === 'hotels' ? 'hotels/find' : path}/${id}`);
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(data.img || "");




    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }


    const getDataType = () => {
        switch (path) {
            case 'hotels':
                return hotelInputs;
            case 'users':
                return userInputs;
            case 'rooms':
                return roomInputs;
            default:
                return null;
        }
    }

    const handleClick = async (e) => {
        console.log('UPDATE');

    }

    const displayData = (array) => {
        return array.map((input) => (
            <div className={classes.formInput} key={input.id}>
                <label>{input.label}</label>
                <input onChange={handleChange} type={input.type} placeholder={data[input.id]} id={input.id} />
            </div>
        ))
    }

    return loading ? (<h2>Loading...</h2>) : (
        <div className={classes.newContainer}>
            <div className={classes.top}>
                <h1>{data.name}</h1>
            </div>
            <div className={classes.bottom}>
                {path === 'users' && (<div className={classes.left}>
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : data.img ||
                                "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />
                </div>)}
                <div className={classes.right}>
                    <form>
                        {path === 'users' && (<div className={classes.formInput}>
                            <label htmlFor="file">
                                Image: <DriveFolderUploadOutlinedIcon className={classes.icon} />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>)}
                        {displayData(getDataType())}
                        <button onClick={handleClick}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit