import express from "express";
import { prisma } from "../../packages/db";

const app = express();

app.use(express.json());

//POST : "/api/submission"
app.post("/api/submission", async (req, res) => {});

//GET; "/api/submission/:submissionId"
app.get("/api/submission/:submissionId", async (req, res) => {});

app.listen(3000, () => console.log("sever running at port 3000"));
