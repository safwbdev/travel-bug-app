import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumbers: {
        type: [{ number: Number, unavailableDates: { type: [String] } }],
    },
}, { timestamps: true })

export default mongoose.model('Room', RoomSchema)