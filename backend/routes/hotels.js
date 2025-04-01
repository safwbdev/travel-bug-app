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
// import { verifyAdmin } from '../utils/verifyToken.js';

const HotelsRouter = express.Router();

// create 
// HotelsRouter.post('/', verifyAdmin, createHotel);
HotelsRouter.post('/', createHotel);

// update 
// HotelsRouter.put('/:id', verifyAdmin, updateHotel);
HotelsRouter.put('/:id', updateHotel);

// delete 
// HotelsRouter.delete('/:id', verifyAdmin, deleteHotel);
HotelsRouter.delete('/:id', deleteHotel);

// get by id 
HotelsRouter.get('/find/:id', getHotel);

// get all
HotelsRouter.get('/', getAllHotels);
HotelsRouter.get('/countByCity', countByCity);
HotelsRouter.get('/countByType', countByType);
HotelsRouter.get('/room/:id', getHotelRooms);

export default HotelsRouter;