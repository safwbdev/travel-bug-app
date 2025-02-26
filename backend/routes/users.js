import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const UserRouter = express.Router();

// UserRouter.get('/checkAuth', verifyToken, (req, res, next) => {
//     res.send("You have successfullly logged in!")
// });

// UserRouter.get('/checkUser/:id', verifyUser, (req, res, next) => {
//     res.send("You have successfullly logged in and you can do whatever you want!")
// });

// UserRouter.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin! You can do whatever you want!")
// });

// update 
UserRouter.put('/:id', verifyUser, updateUser);

// delete 
UserRouter.delete('/:id', verifyUser, deleteUser);

// get by id 
UserRouter.get('/:id', verifyUser, getUser);

// get all
UserRouter.get('/', verifyAdmin, getAllUsers);

export default UserRouter;