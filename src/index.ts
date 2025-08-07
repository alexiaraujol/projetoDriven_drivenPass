import express, { json, Request, Response } from "express";
import router from "./routes/index-router";

const app = express();

app.use(json());
app.use(router);

app.get("/health", (req: Request, res: Response) => {
    res.send("I'm OK!").status(200);
});

app.listen(5000, () => console.log("Server is up!")); 

