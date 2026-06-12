import morgan from "morgan";
import express, { type Request, type Response } from "express";
import router from "./routes/router.js";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  morgan(":date[clf] :remote-addr :method :url :status :response-time ms"),
);

// Routes
app.use(router);

app.listen(3000, "127.0.0.1", () => {
  console.log("server is running at port 3000");
});
