
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import techRoute from "./routes/tech.route.js";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();


app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/techniciens", techRoute);
//app.use("/api/banks", bankRoute);

app.listen(8000, () => {
    console.log("Server is running!");
  });
  