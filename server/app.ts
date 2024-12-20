import express from 'express';
export const app = express();
import cors from "cors";
import cookieParser from 'cookie-parser';
//END OF IMPORTS

//body parser
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));