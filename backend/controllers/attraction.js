
import Attraction from '../models/Attraction.js';



export const createAttraction = async (req, res, next) => {
    const newAttraction = new Attraction(req.body);

    try {
        const savedAttraction = await newAttraction.save();
        res.status(200).json(savedAttraction);
    } catch (error) {
        next(error);
    }
}
export const updateAttraction = async (req, res, next) => {
    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedAttraction);
    } catch (error) {
        next(error);
    }
}
export const deleteAttraction = async (req, res, next) => {
    try {
        await Attraction.findByIdAndDelete(req.params.id);
        res.status(200).json('Attraction has been removed');
    } catch (error) {
        next(error);
    }
}
export const getAttraction = async (req, res, next) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        res.status(200).json(attraction);
    } catch (error) {
        next(error);
    }
}
export const getAllAttractions = async (req, res, next) => {
    try {
        const { limit, featured, min, max, type, ...others } = req.query;
        // const types = type.split(",");

        const attractions = await Attraction.find({
            ...others,
            // price: { $gt: min || 0, $lt: max || 999 }
        }).limit(limit);

        // let updatedArray = [];

        // attractions.map(htl => {
        //     if (types.includes(htl.type)) updatedArray.push(htl)
        // })
        // console.log(attractions);

        res.status(200).json(attractions);
    } catch (error) {
        next(error)
    }
}


export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map((city) => {
            return Attraction.countDocuments({ city: city })
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}

export const getFeaturedAttractions = async (req, res, next) => {
    try {
        const { limit, ...others } = req.query;
        const Attractions = await Attraction.find({
            ...others,
            featured: true,
        }).limit(limit);
        res.status(200).json(Attractions);

    } catch (error) {
        next(error)
    }
}