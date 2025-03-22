import React, { useState } from 'react'
import classes from './New.module.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Sidebar, Navbar } from '../../components'
import axios from 'axios';
import { IMG_UPLOAD_PATH, REGISTER_PATH } from '../../routes';

const New = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleClick = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const uploadRes = await axios.post(IMG_UPLOAD_PATH, data);
            const { url } = uploadRes.data;
            const newUser = {
                ...info,
                img: url
            }
            await axios.post(REGISTER_PATH, newUser);

        } catch (err) {
            console.log(err);

        }

    }

    return (
        <div className={classes.new}>
            <Sidebar />
            <div className={classes.newContainer}>
                <Navbar />
                <div className={classes.top}>
                    <h1>{title}</h1>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.left}>
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className={classes.right}>
                        <form>
                            <div className={classes.formInput}>
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className={classes.icon} />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => {
                                return (
                                    <div className={classes.formInput} key={input.id}>
                                        <label>{input.label}</label>
                                        <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                                    </div>
                                )
                            })}
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New