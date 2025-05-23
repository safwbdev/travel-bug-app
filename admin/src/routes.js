export const API_URL = `${import.meta.env.VITE_API_URL}`;
// export const API_URL = `http://localhost:8800/api`;
export const CLOUDINARY_ID = import.meta.env.VITE_CLOUDINARY

// Fetch 
export const ROOM_PATH = `${API_URL}/rooms`;
export const HOTEL_PATH = `${API_URL}/hotels`;
export const ATTRACTION_PATH = `${API_URL}/attractions`;

// axios 
export const LOGIN_PATH = `${API_URL}/auth/login`;
export const REGISTER_PATH = `${API_URL}/auth/register`;
export const USER_PATH = `${API_URL}/users`;

// Cloudinary 
export const IMG_UPLOAD_PATH = `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload`;

// Navigation 
export const ROOT = `/`;
export const LOGIN = `login`;
export const USERS = `users`;
export const BY_ID = `:userId`;
export const EDIT = `edit`;
export const NEW = `new`;
export const HOTELS = `hotels`;
export const ATTRACTIONS = `attractions`;
export const ROOMS = `rooms`;