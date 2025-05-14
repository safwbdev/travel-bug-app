import mongoose from "mongoose";

const AttractionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
})

export default mongoose.model('Attraction', AttractionSchema)