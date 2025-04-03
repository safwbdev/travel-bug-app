import React from 'react'
import { CircularProgress, Grid2 } from '@mui/material'

const LoadingComponent = () => {
    return (
        <Grid2
            container
            justifyContent="center"
            alignContent='center'
            spacing={1}
            style={{
                height: '50vh',
                width: '100%'
            }}>
            <CircularProgress />
        </Grid2>
    )
}

export default LoadingComponent