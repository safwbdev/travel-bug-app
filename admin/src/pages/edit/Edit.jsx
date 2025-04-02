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
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Grid2,
    TextField,
} from '@mui/material';

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

    const displayData = (array) => array.map((input) => (
        <Grid2 size={{ xs: 12, sm: 6 }} key={input.id} >
            <TextField
                id={input.id}
                label={input.label || ''}
                variant="outlined"
                placeholder={data[input.label]}
                value={info[input.id]}
                onChange={handleChange}
                fullWidth
                type={input.type}
                disabled={input.id === 'username'} />
        </Grid2>
    ))


    return loading ? (<CircularProgress />) : (
        <Grid2 container justify="center" spacing={1}>
            <Grid2 item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title={`EDIT ${path.toLocaleUpperCase().slice(0, -1)}`} />
                    <form>
                        <CardContent>
                            {requiresImage && (<CardHeader title={
                                <>
                                    <label htmlFor="file"
                                        style={{
                                            alignItems: "center",
                                            display: "flex",
                                            width: 'max-content'
                                        }}>
                                        <DriveFolderUploadOutlinedIcon
                                            className={classes.icon} style={{ marginRight: '.3em' }} />
                                        Upload new Image
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </>}
                                avatar={
                                    <Avatar alt="image" src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : data.img ||
                                            defaultImg
                                    }
                                        variant="square"
                                        sx={{ width: 150, height: 150 }} />
                                } ></CardHeader>)}
                            <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                {displayData(getDataType())}
                            </Grid2>
                        </CardContent>
                        <CardActions>
                            <Button fullWidth variant='contained' onClick={handleClick}>Update</Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid2>
        </Grid2>
    )
}

export default Edit