import React, { useEffect, useState } from 'react'
import classes from './EditHotel.module.scss'
import useFetch from '../../hooks/useFetch'
import { API_URL, IMG_UPLOAD_PATH, ROOM_PATH } from '../../routes'
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
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid2,
    TextField,
    ImageList,
    ImageListItem,
} from '@mui/material';

const EditHotel = () => {
    const path = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[3];
    const { data: hotelData, loading } = useFetch(`${API_URL}/hotels/find/${id}`);
    const { data: roomData } = useFetch(ROOM_PATH);

    const [info, setInfo] = useState({});
    const [files, setFiles] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);
    const [defaultImg, setdefaultImg] = useState("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");
    const navigate = useNavigate()

    useEffect(() => {
        setInfo(hotelData);
        setIsFeatured(hotelData.featured);
    }, [hotelData]);

    // Populate the Room checkboxes 
    useEffect(() => {
        if (!roomData || info.length === 0) return;
        roomData.map((dat) => {
            if (rooms.find(obj => obj.id !== dat._id)) {
                return
            } else {
                const getroomId = info.rooms.find(obj => obj === dat._id);
                const newRow = { id: dat._id, label: dat.title, isChecked: getroomId === dat._id }
                setRooms(currentRoom => [...currentRoom, newRow]);
            }
        })

    }, [roomData, info])

    // Update Room Checkboxes after being interacted with 
    useEffect(() => {
        if (!rooms) return;
        setSelectedRooms([])
        rooms.map(dat => {
            if (dat.isChecked) {
                setSelectedRooms(currSelect => [...currSelect, dat.id])
            }
        })
    }, [rooms]);

    useEffect(() => {
        if (info.photos && info.photos.length > 0) {
            setdefaultImg(info.photos[0]);
        }
    }, [info])

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

    const handleClick = async () => {
        let updatedData = {};
        if (file) {
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


            try {
                updatedData = {
                    ...info,
                    rooms: selectedRooms,
                    photos: list,
                    featured: isFeatured
                };
            } catch (err) {
                console.log(err);

            }

        } else {
            updatedData = {
                ...info,
                rooms: selectedRooms,
                featured: isFeatured
            };
        }

        try {
            console.log(`${API_URL}/${path}/${id}`);
            await axios.put(`${API_URL}/${path}/${id}`, updatedData);
            const getType = path[0].toUpperCase() + path.slice(1);
            console.log(updatedData);

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
                placeholder={hotelData[input.label]}
                value={info[input.id]}
                onChange={handleChange}
                fullWidth
                type={input.type} />
        </Grid2>
    ));

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
    </>);

    const SelectedMainImage = () => (
        <Avatar alt="image" src={files
            ? URL.createObjectURL(files[0])
            : defaultImg}
            variant="square"
            sx={{ width: 150, height: 150 }} />
    )

    return loading ? (<CircularProgress />) : (
        <Grid2 container justify="center" spacing={1}>
            <Grid2 item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title={`EDIT HOTEL`} />
                    <form>
                        <CardContent>
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
                                        {Object.values(files).map((item, index) => {
                                            return (
                                                <ImageListItem key={index}>
                                                    <img
                                                        srcSet={URL.createObjectURL(files[index])}
                                                        src={URL.createObjectURL(files[index])}
                                                        alt='hotelImg'
                                                        loading="lazy"
                                                    />
                                                    <Fab
                                                        onClick={() => handleDelete(index)}
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
                                            )
                                        })}
                                    </ImageList>
                                )}
                            </Grid2>
                            <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                {displayData(hotelInputs)}
                                {path === "hotels" && (<Grid2 size={{ xs: 12, sm: 6 }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={isFeatured ? true : false} onChange={() => setIsFeatured(!isFeatured)} name="featured" />
                                            }
                                            label={'Is Featured'}
                                        />
                                    </FormGroup>
                                </Grid2>)}
                                {path === "hotels" && (
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
                                )}
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

export default EditHotel