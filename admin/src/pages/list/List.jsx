import React from 'react'
import classes from './List.module.scss'
import { Datatable } from '../../components'

const List = ({ columns }) => {
    return (
        <div className={classes.list}>
            <Datatable columns={columns} />
        </div>
    )
}

export default List