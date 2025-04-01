import React, { useState } from 'react'
import classes from './NewUser.module.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';
import { IMG_UPLOAD_PATH, REGISTER_PATH } from '../../routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid2, TextField } from '@mui/material';
import { userInputs } from '../../formSource';

const NewUser = () => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const defaultImg = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(IMG_UPLOAD_PATH, data);
            const { url } = uploadRes.data;
            const newUser = {
                ...info,
                img: url
            }
            await axios.post(REGISTER_PATH, newUser);
            toast.success(`New User has been created!`);
            navigate(`/users`)

        } catch (err) {
            console.log(err);

        }

    }

    const displayData = (array) => array.map((input) => (
        <Grid2 size={6} key={input.id} >
            <TextField
                id={input.id}
                label={input.label || ''}
                variant="outlined"
                placeholder={input.label}
                value={info[input.id]}
                onChange={handleChange}
                fullWidth
                type={input.type} />
        </Grid2>
    ))

    return (
        <Grid2 container justify="center" spacing={1}>
            <Grid2 item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title={`ADD NEW USER`} />
                    <CardContent>
                        <CardHeader title={
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
                                        : defaultImg
                                }
                                    variant="square"
                                    sx={{ width: 150, height: 150 }} />
                            } ></CardHeader>
                        <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            {displayData(userInputs)}
                        </Grid2>
                        <CardActions>
                            <Button variant='contained' onClick={handleClick}>Create</Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    )
}

export default NewUser