import {app} from './app';
import connectDB from './utils/db';
require("dotenv").config();
const PORT = process.env.PORT as string;
import cloudinary from 'cloudinary'

//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
//cloudinary supports various image formats including base-64

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    connectDB();
});