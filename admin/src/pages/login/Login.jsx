import React, { useContext, useState } from 'react'
import classes from './Login.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LOGIN_PATH } from '../../routes';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post(LOGIN_PATH, credentials)

            if (res.data.isAdmin) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
                navigate("/")
            } else {
                dispatch({ type: "LOGIN_FAIL", message: "You are not authorized" });
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
        }
    }

    return (
        <div className={classes.login}>
            <div className={classes.loginContainer}>
                <input type="text" placeholder="username" id="username" className={classes.loginInput} onChange={handleChange} />
                <input type="password" placeholder="password" id="password" className={classes.loginInput} onChange={handleChange} />
                <button className={classes.loginButton} disabled={loading} onClick={handleLogin}>
                    Log In
                </button>
                {error && (<span>{error.message}</span>)}
            </div>
        </div>
    )
}

export default Login