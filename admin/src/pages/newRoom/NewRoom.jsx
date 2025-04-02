import React, { useState } from 'react'
import classes from './NewRoom.module.scss'
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { HOTEL_PATH, ROOM_PATH } from '../../routes';
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';

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

    const handleSelect = (e) => {
        e.preventDefault();
        setHotelId(e.target.value)
    }

    return (
        <Grid2 container justify="center" spacing={1}>
            <Grid2 item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title={`ADD NEW ROOM`} />
                    <form>
                        <CardContent>
                            <Grid2 container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                {roomInputs.map((input) => (
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
                                {/* FIXME  */}
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <textarea onChange={e => setRooms(e.target.value)} placeholder='Give comma between room numbers' />
                                </Grid2>
                                {/* FIXME  */}
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Hotel</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={hotelId}
                                            defaultValue=""
                                            label="Select Hotel"
                                            onChange={handleSelect}
                                        >
                                            {data && data.map((hotel) => (<MenuItem value={hotel._id} key={hotel._id}>{hotel.name}</MenuItem>))}
                                        </Select>
                                    </FormControl>
                                </Grid2>
                            </Grid2>
                            <CardActions>
                                <Button variant='contained' fullWidth onClick={handleClick}>Create</Button>
                            </CardActions>
                        </CardContent>
                    </form>
                </Card>
            </Grid2>
        </Grid2>
    )
}

export default NewRoom