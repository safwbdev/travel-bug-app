import React from 'react'
import classes from './List.module.scss'
import { Sidebar, Navbar, Datatable } from '../../components'

const List = ({ columns }) => {
    return (
        <div className={classes.list}>
            <Sidebar />
            <div className={classes.listContainer}>
                <Navbar />
                <Datatable columns={columns} />
            </div>
        </div>
    )
}

export default List