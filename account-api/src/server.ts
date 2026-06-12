import morgan from "morgan";
import express, { type Request, type Response } from "express";

const app = express();

app.set("trust proxy", true);

app.use(
  morgan(":date[clf] :remote-addr :method :url :status :response-time ms"),
);

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "UP",
  });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("server is running at port 3000");
});
