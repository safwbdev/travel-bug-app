import React, { useEffect, useState } from 'react'
import classes from './NewAttraction.module.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { attractionInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { ATTRACTION_PATH, HOTEL_PATH, IMG_UPLOAD_PATH, ROOM_PATH } from '../../routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Fab, FormControlLabel, FormGroup, FormLabel, Grid2, ImageList, ImageListItem, TextField } from '@mui/material';

const NewAttraction = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [isFeatured, setIsFeatured] = useState(false);
    const { data, loading, error } = useFetch(ROOM_PATH);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    console.log('adding');

                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(IMG_UPLOAD_PATH, data);
                    const { url } = uploadRes.data;
                    return url
                }));

            const newAttraction = {
                ...info,
                photos: list,
                featured: isFeatured
            };

            await axios.post(ATTRACTION_PATH, newAttraction);
            toast.success(`Attraction has been created!`);
            navigate(`/attractions`)
        } catch (err) {
            console.log(err);
        }
    }

    const UploadImageButton = () => (<>
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
            multiple
            onChange={(e) => setFiles(e.target.files)}
            style={{ display: "none" }}
        />
    </>)
    const SelectedMainImage = () => (
        <Avatar alt="image" src={files
            ? URL.createObjectURL(files[0])
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            variant="square"
            sx={{ width: 150, height: 150 }} />
    )

    return (
        <Grid2 container justify="center" spacing={1}>
            <Grid2 item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title={`ADD NEW ATTRACTION`} />
                    <form>
                        <CardContent >
                            <Grid2
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                container
                                justifyContent='space-between'
                                rowSpacing={4}>
                                <Grid2 item xs={1} display={'flex'}>
                                    <CardHeader
                                        title={<UploadImageButton />}
                                        avatar={<SelectedMainImage />}
                                    />
                                </Grid2>
                                <Grid2 item xs={12}>
                                    {files && (
                                        <ImageList
                                            sx={{ width: 600, height: 250 }}
                                            cols={3} rowHeight={164}>
                                            {Object.values(files).map((item, index) => (
                                                <ImageListItem key={index}>
                                                    <img
                                                        srcSet={URL.createObjectURL(files[index])}
                                                        src={URL.createObjectURL(files[index])}
                                                        alt='attractionImg'
                                                        loading="lazy"
                                                    />
                                                    <Fab
                                                        color="primary"
                                                        aria-label="add"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 5,
                                                            top: 5
                                                        }}>
                                                        <CloseIcon />
                                                    </Fab>
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    )}
                                </Grid2>
                            </Grid2>
                            <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                {attractionInputs.map((input) => (
                                    <Grid2 size={{ xs: 12, sm: 6 }} key={input.id} >
                                        <TextField
                                            id={input.id}
                                            label={input.label || ''}
                                            variant="outlined"
                                            placeholder={data[input.label]}
                                            value={info[input.id]}
                                            onChange={handleChange}
                                            fullWidth
                                            type={input.type} />
                                    </Grid2>

                                ))}
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={isFeatured} onChange={() => setIsFeatured(!isFeatured)} name="featured" />
                                            }
                                            label={'Is Featured'}
                                        />
                                    </FormGroup>
                                </Grid2>
                            </Grid2>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' fullWidth onClick={handleClick}>Create</Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid2>
        </Grid2 >
    )
}

export default NewAttraction