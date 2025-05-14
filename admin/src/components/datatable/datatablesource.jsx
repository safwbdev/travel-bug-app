import classes from './datatablesource.module.scss'

export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className={classes.cellWithImg}>
                    <img className={classes.cellImg} src={params.row.img || 'https://i.imgflip.com/10itb3.jpg'} alt="avatar" />
                    {params.row.username}
                </div>
            )
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "country",
        headerName: "Country",
        width: 100,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 100,
    },
];

export const hotelColumns = [
    {
        field: "_id",
        headerName: "ID",
        width: 250
    },
    {
        field: "name",
        headerName: "Name",
        width: 150,
    },
    {
        field: "type",
        headerName: "Type",
        width: 100,
    },
    {
        field: "title",
        headerName: "Title",
        width: 100,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
    },
];
export const attractionsColumns = [
    {
        field: "_id",
        headerName: "ID",
        width: 250
    },
    {
        field: "title",
        headerName: "Title",
        width: 150,
    },
    {
        field: "type",
        headerName: "Type",
        width: 100,
    },
    {
        field: "location",
        headerName: "Location",
        width: 100,
    },
    {
        field: "price",
        headerName: "Price",
        width: 100,
    },
    {
        field: "city",
        headerName: "City",
        width: 100,
    },
];

export const roomColumns = [
    {
        field: "_id",
        headerName: "ID",
        width: 250
    },
    {
        field: "title",
        headerName: "Title",
        width: 150,
    },
    {
        field: "price",
        headerName: "Price",
        width: 150,
    },
    {
        field: "desc",
        headerName: "Desc",
        width: 150,
    },
    {
        field: "maxPeople",
        headerName: "Max People",
        width: 150,
    },
];