import express from 'express';
// import { verifyAdmin } from '../utils/verifyToken.js';
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getRoom,
    updateRoom,
    updateRoomAvailability
} from '../controllers/room.js';

const RoomsRouter = express.Router();

// create 
// RoomsRouter.post('/:hotelid', verifyAdmin, createRoom);
RoomsRouter.post('/:hotelid', createRoom);

// update 
// RoomsRouter.put('/:id', verifyAdmin, updateRoom);
RoomsRouter.put('/:id', updateRoom);
RoomsRouter.put('/availabilty/:id', updateRoomAvailability);

// delete 
// RoomsRouter.delete('/:id/:hotelid', verifyAdmin, deleteRoom);
RoomsRouter.delete('/:id/:hotelid', deleteRoom);

// get by id 
RoomsRouter.get('/:id', getRoom);

// get all
RoomsRouter.get('/', getAllRooms);


export default RoomsRouter;