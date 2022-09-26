//khi đã cấu hình babel, có thể import thay require
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
require("dotenv").config();
// import connection from "./configs/connectDB";
const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
