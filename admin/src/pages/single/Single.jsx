import React, { useEffect, useState } from 'react'
import classes from './Single.module.scss'
import useFetch from '../../hooks/useFetch'
import { API_URL } from '../../routes'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@mui/material';
import {
    hotelInputs,
    userInputs,
    roomInputs
} from '../../editFormSource'

const Single = () => {

    const path = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[2];

    const [defaultImg, setdefaultImg] = useState("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");

    const { data, loading } = useFetch(`${API_URL}/${path === 'hotels' ? 'hotels/find' : path}/${id}`);

    useEffect(() => {
        if (path === 'users') {
            setdefaultImg(data.img);
        }
        if (path === 'hotels' && data.photos && data.photos.length > 0) {
            setdefaultImg(data.photos[0]);
        }
    }, [data])

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
    const displayData = (array) => {
        return array.map((arr) => (
            <div className={classes.descText} key={arr.id}>
                <span>
                    {arr.label}:
                </span>
                {data[arr.id] || 'NA'}</div>
        ))
    }

    return loading ? (<CircularProgress />) : (
        <Card sx={{ display: 'flex', width: '100%' }}>
            {path !== 'rooms' && (<CardMedia
                component="img"
                sx={{ width: 500 }}
                image={defaultImg}
                alt="NA"
            />)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1  auto' }}>
                    <Typography component="div" variant="h5">
                        {data.username}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {path === 'users' ? data.isAdmin ? 'Admin' : 'General User' : ''}
                    </Typography>
                    {displayData(getDataType())}
                </CardContent>
            </Box>
        </Card>
    )
}

export default Single