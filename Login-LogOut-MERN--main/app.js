import express from "express";
import applicationErrors from "./controllers/errorHandle.js";
import productRoutes from "./routes/productRoutes.js";
import userRoute from "./routes/userRoutes.js";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());

//connection with fronted
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(morgan("dev"));

const limit = rateLimit({
  max: 50,
  windowMs: 1000,
  message: "overloaded with request from an IP",
});

app.use("/api", limit);

app.use(express.json()); //body parser

app.use("/api/v5/product", productRoutes);
app.use("/api/v5/user", userRoute);

app.use(applicationErrors);

export default app;
