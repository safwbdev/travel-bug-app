import express from 'express';
import {
    createAttraction,
    deleteAttraction,
    getAllAttractions,
    getAttraction,
    getFeaturedAttractions,
    updateAttraction
} from '../controllers/attraction.js';
// import { verifyAdmin } from '../utils/verifyToken.js';

const AttractionsRouter = express.Router();

// create 
// AttractionsRouter.post('/', verifyAdmin, createHotel);
AttractionsRouter.post('/', createAttraction);

// update 
// AttractionsRouter.put('/:id', verifyAdmin, updateHotel);
AttractionsRouter.put('/:id', updateAttraction);

// delete 
// AttractionsRouter.delete('/:id', verifyAdmin, deleteHotel);
AttractionsRouter.delete('/:id', deleteAttraction);

// get by id 
AttractionsRouter.get('/:id', getAttraction);

// get all
AttractionsRouter.get('/', getAllAttractions);
AttractionsRouter.get('/featured', getFeaturedAttractions);

export default AttractionsRouter;