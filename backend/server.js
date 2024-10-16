import express from "express"
import "dotenv/config"
import cors from "cors"
import { connectDb } from "./config/db.js";
import userRouter from "./route/userRoute.js";
import bookingRouter from "./route/bookingRoute.js";
import sportroute from "./route/sportRoute.js"
import centreroute from "./route/centreRoute.js"
import courtRoute from "./route/courtRoute.js";
import scheduleRoute from "./route/scheduleRoute.js"

const app = express()
const port = 4000;
app.use(express.json())
app.use(cors())
connectDb();

app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/sport", sportroute);
app.use("/api/centre", centreroute);
app.use("/api/court",courtRoute);
app.use("/api/schedule", scheduleRoute);

app.listen(port, () => {
    console.log(`server is on on http:localhost:${port}`)
})