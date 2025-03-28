import React from 'react'
import classes from './Single.module.scss'
import useFetch from '../../hooks/useFetch'
import { API_URL } from '../../routes'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
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

    const { data, loading } = useFetch(`${API_URL}/${path === 'hotels' ? 'hotels/find' : path}/${id}`);

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

    return loading ? (<h2>Loading...</h2>) : (
        <Card sx={{ display: 'flex', width: '100%' }}>
            <CardMedia
                component="img"
                sx={{ width: 500 }}
                image={data.img}
                alt="NA"
            />
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
                        {data.isAdmin ? 'Admin' : 'General User'}
                    </Typography>
                    {displayData(getDataType())}
                </CardContent>
            </Box>
        </Card>
    )
}

export default Single