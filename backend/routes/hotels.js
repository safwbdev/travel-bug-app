import express from 'express';
import {
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
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
HotelsRouter.get('/:id', getHotel);

// get all
HotelsRouter.get('/', getAllHotels);

export default HotelsRouter;