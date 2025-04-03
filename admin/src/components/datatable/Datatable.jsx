import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import classes from './Datatable.module.scss'
import { Link, useLocation, } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.jsx';
import axios from 'axios';
import { API_URL, EDIT } from '../../routes.js';
import { toast } from 'react-toastify';
import { Button, CircularProgress, Grid2 } from '@mui/material';


const Datatable = ({ columns }) => {
    const [list, setList] = useState([]);
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const { data, loading, error, reFetch } = useFetch(`${API_URL}/${path}`);
    const { data: hotelData } = useFetch(`${API_URL}/hotels`);

    useEffect(() => {
        setList(data);
    }, [data]);

    useEffect(() => {
        reFetch()
    }, [path]);



    const getHotelIdByRoom = (roomId) => {
        let hotelID = null;
        hotelData.map(hd => {
            if (hd.rooms.includes(roomId)) {
                hotelID = hd._id
            }
        })
        return hotelID;
    }

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            const getType = path[0].toUpperCase() + path.slice(1);
            const hotelId = path === 'rooms' ? getHotelIdByRoom(id) : null;
            try {
                const deleteDefaultURI = `${path}/${id}`
                const deleteRoomURI = `rooms/${id}/${hotelId}`;
                await axios.delete(`${API_URL}/${path === 'rooms' ? deleteRoomURI : deleteDefaultURI}`)
                setList(list.filter((item) => item._id !== id));
                toast.error(`${getType.slice(0, -1)} has been deleted!`)
            } catch (err) {
                console.log(err);
            }
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 400,
            renderCell: (params) => {
                return (
                    <div className={classes.cellAction}>
                        <Link to={params.row._id} style={{ textDecoration: "none" }}>
                            <Button variant="contained">View</Button>

                        </Link>
                        <Link to={`${EDIT}/${params.row._id}`} style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="success">Edit</Button>
                        </Link>
                        <Button variant="contained" color="error"
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </Button>

                    </div>
                );
            },
        },
    ];
    return (
        <Grid2 container justify="center" spacing={1}>
            {loading ? (<CircularProgress />) : (
                <div className={classes.datatable}>
                    <div className={classes.datatableTitle}>
                        <h4>
                            {path}
                        </h4>
                        <Link to={`/${path}/new`}>
                            <Button variant='contained' color="success">
                                Add New {path.slice(0, -1)}
                            </Button>
                        </Link>
                    </div>
                    <DataGrid
                        className={classes.datagrid}
                        rows={list}
                        columns={columns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                        getRowId={(row) => row._id}
                    />
                </div>
            )}

        </Grid2>

    );
}
export default Datatable