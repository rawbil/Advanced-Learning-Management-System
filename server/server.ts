import {app} from "./app.ts";
require("dotenv").config();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})