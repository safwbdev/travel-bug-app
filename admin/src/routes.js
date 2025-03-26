const API_URL = import.meta.env.VITE_API_URL;
const CLOUDINARY_ID = import.meta.env.VITE_CLOUDINARY


// Fetch 
export const ROOM_PATH = `${API_URL}/api/rooms`;
export const HOTEL_PATH = `/api/hotels`;

// axios 
export const LOGIN_PATH = `${API_URL}/api/auth/login`;
export const REGISTER_PATH = `${API_URL}/api/auth/register`;
export const IMG_UPLOAD_PATH = `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload`;

// Navigation 
export const ROOT = `/`;
export const LOGIN = `login`;
export const USERS = `users`;
export const BY_ID = `:userId`;
export const NEW = `new`;
export const HOTELS = `hotels`;
export const ROOMS = `rooms`;