import express from 'express';
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    getHotelRooms,
    updateHotel
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const HotelsRouter = express.Router();

// create 
HotelsRouter.post('/', verifyAdmin, createHotel);

// update 
HotelsRouter.put('/:id', verifyAdmin, updateHotel);

// delete 
HotelsRouter.delete('/:id', verifyAdmin, deleteHotel);

// get by id 
HotelsRouter.get('/find/:id', getHotel);

// get all
HotelsRouter.get('/', getAllHotels);
HotelsRouter.get('/countByCity', countByCity);
HotelsRouter.get('/countByType', countByType);
HotelsRouter.get('/room/:id', getHotelRooms);

export default HotelsRouter;