import React, { useEffect, useState } from 'react'
import classes from './NewHotel.module.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { HOTEL_PATH, IMG_UPLOAD_PATH, ROOM_PATH } from '../../routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Fab, FormControlLabel, FormGroup, FormLabel, Grid2, ImageList, ImageListItem, TextField } from '@mui/material';

const NewHotel = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const { data, loading, error } = useFetch(ROOM_PATH);
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;
        data.map((dat) => {
            if (rooms.find(obj => obj.id !== dat._id)) return
            const newRow = { id: dat._id, label: dat.title, isChecked: false }
            setRooms(currentRoom => [...currentRoom, newRow]);
        })
    }, [data]);


    useEffect(() => {
        if (!rooms) return;
        setSelectedRooms([])
        rooms.map(dat => {
            if (dat.isChecked) {
                setSelectedRooms(currSelect => [...currSelect, dat.id])
            }
        })
    }, [rooms]);

    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSelect = (e) => {
        const obj = rooms.find(x => x.id === e.target.id);
        const newObj = { ...obj, isChecked: !obj.isChecked }
        setRooms(rooms.filter((item) => item.id !== e.target.id));
        setRooms(currRoom => [...currRoom, newObj])
        rooms.sort((a, b) => a.label.localeCompare(b.label))

    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log('start');

        /**
         *
         * TODO: 
         * - delete the extra images on UI
         * - select rooms checkbox order bug (order of checkboxes shouldn't change)
         * 
         */

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

            const newHotel = {
                ...info,
                rooms: selectedRooms,
                photos: list,
                featured: isFeatured
            };

            await axios.post(HOTEL_PATH, newHotel);
            toast.success(`Hotel has been created!`);
            navigate(`/hotels`)
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
                    <CardHeader title={`ADD NEW HOTEL`} />
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
                                                        alt='hotelImg'
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
                                {hotelInputs.map((input) => (
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
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <FormLabel component="legend">Select Room(s)</FormLabel>
                                    <FormGroup>
                                        {rooms && rooms.map((room) => (
                                            <FormControlLabel key={room.id}
                                                control={
                                                    <Checkbox
                                                        checked={room.isChecked}
                                                        value={room.id}
                                                        id={room.id}
                                                        onChange={handleSelect
                                                        } />
                                                }
                                                label={room.label}
                                            />
                                        ))}
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

export default NewHotel