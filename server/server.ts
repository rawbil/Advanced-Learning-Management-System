import {app} from './app';
import connectDB from './utils/db';
require("dotenv").config();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    connectDB();
});