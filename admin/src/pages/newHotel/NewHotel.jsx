import React, { useEffect, useState } from 'react'
import classes from './NewHotel.module.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { HOTEL_PATH, IMG_UPLOAD_PATH, ROOM_PATH } from '../../routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid2, TextField } from '@mui/material';

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


    console.log(selectedRooms);


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
         * - display the extra images on UI
         * - delete the extra images on UI
         * - select rooms checkbox bug
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

            console.log(newHotel);


            await axios.post(HOTEL_PATH, newHotel);
            toast.success(`Hotel has been created!`);
            navigate(`/hotels`)
        } catch (err) {

        }
    }


    return (
        <Grid2 container justify="center" spacing={1}>
            <Grid2 item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title={`ADD NEW HOTEL`} />
                    <form>
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
                                        // onChange={(e) => setFile(e.target.files[0])}
                                        onChange={(e) => setFiles(e.target.files)}
                                        style={{ display: "none" }}
                                    />
                                </>}
                                avatar={
                                    <Avatar alt="image" src={
                                        files
                                            ? URL.createObjectURL(files[0])
                                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                        variant="square"
                                        sx={{ width: 150, height: 150 }} />
                                } ></CardHeader>
                            <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                {hotelInputs.map((input) => (
                                    <Grid2 size={6} key={input.id} >
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
                                <Grid2 size={6}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={isFeatured} onChange={() => setIsFeatured(!isFeatured)} name="featured" />
                                            }
                                            label={'Is Featured'}
                                        />
                                    </FormGroup>
                                </Grid2>
                                {/* <Grid2 size={6}>
                                    <label>Rooms</label>
                                    <select id="featured" onChange={handleSelect} multiple>
                                        {loading ? 'loading' : data && data.map((room) => (<option key={room._id} value={room._id}>{room.title}</option>))}
                                    </select>
                                </Grid2> */}
                                <Grid2 size={6}>
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
                            <Button variant='contained' onClick={handleClick}>Create</Button>
                        </CardActions>
                    </form>
                </Card>
            </Grid2>
        </Grid2 >
    )
}

export default NewHotel