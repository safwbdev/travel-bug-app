import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import classes from './Datatable.module.scss'
import { Link, useLocation, } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.jsx';
import axios from 'axios';
import { API_URL, EDIT } from '../../routes.js';
import { toast } from 'react-toastify';


const Datatable = ({ columns }) => {
    const [list, setList] = useState([]);
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const { data, loading, error, reFetch } = useFetch(`${API_URL}/${path}`);

    useEffect(() => {
        setList(data);
    }, [data]);

    useEffect(() => {
        reFetch()
    }, [path]);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this entry?")) {
            try {
                await axios.delete(`${API_URL}/${path}/${id}`)
                setList(list.filter((item) => item._id !== id));
                toast.error(`Entry has been deleted!`)

            } catch (err) {
                console.log(err);
            }
        }
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className={classes.cellAction}>
                        <Link to={params.row._id} style={{ textDecoration: "none" }}>
                            <div className={classes.viewButton}>View</div>
                        </Link>
                        <Link to={`${EDIT}/${params.row._id}`} style={{ textDecoration: "none" }}>
                            <div className={classes.viewButton}>Edit</div>
                        </Link>
                        <div
                            className={classes.deleteButton}
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className={classes.datatable}>
            <div className={classes.datatableTitle}>
                <h4>
                    {path}
                </h4>
                <Link to={`/${path}/new`} className={classes.link}>
                    Add New
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
    );
};

export default Datatable