import React, { useEffect, useState } from 'react'
import classes from './Edit.module.scss'
import useFetch from '../../hooks/useFetch'
import { API_URL, IMG_UPLOAD_PATH } from '../../routes'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {
    hotelInputs, userInputs,
    roomInputs
} from '../../editFormSource'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Edit = () => {
    const path = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[3];
    const { data, loading } = useFetch(`${API_URL}/${path === 'hotels' ? 'hotels/find' : path}/${id}`);
    const requiresImage = path === 'users' || path === 'hotels';

    const [info, setInfo] = useState({});
    const [file, setFile] = useState("");
    const [defaultImg, setdefaultImg] = useState("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");
    const navigate = useNavigate()

    useEffect(() => {
        setInfo(data);
    }, [data])

    useEffect(() => {
        if (!requiresImage) return;
        if (path === 'users') {
            setdefaultImg(data.img);
        }
        if (path === 'hotels' && info.photos && info.photos.length > 0) {
            setdefaultImg(data.photos[0]);
        }
    }, [info])

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

    const handleClick = async () => {
        let updatedData = {};
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            try {
                const uploadRes = await axios.post(IMG_UPLOAD_PATH, data);
                const { url } = uploadRes.data;
                updatedData = { ...info, img: url };
            } catch (err) {
                console.log(err);

            }

        } else {
            updatedData = { ...info };
        }

        try {
            await axios.put(`${API_URL}/${path}/${id}`, updatedData);
            const getType = path[0].toUpperCase() + path.slice(1);
            toast.success(`${getType.slice(0, -1)} has been updated!`);
            navigate(`/${path}`)
        } catch (err) {
            console.log(err);
        }
    }

    const displayData = (array) => {
        return array.map((input) => (
            <div className={classes.formInput} key={input.id}>
                <label>{input.label}</label>
                <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={data[input.label]}
                    value={info[input.id]}
                    disabled={input.id === 'username'}
                    id={input.id} />
            </div>
        ))
    }

    return loading ? (<h2>Loading...</h2>) : (
        <div className={classes.newContainer}>
            <div className={classes.top}>
                <h1>{data.name}</h1>
            </div>
            <div className={classes.bottom}>
                {requiresImage && (<div className={classes.left}>
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : data.img ||
                                defaultImg
                        }
                        alt=""
                    />
                </div>)}
                <div className={classes.right}>
                    <form>
                        {requiresImage && (<div className={classes.formInput}>
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
                    </form>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2.5em 0' }}>
                        <Button variant='contained' onClick={handleClick}>Update</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit