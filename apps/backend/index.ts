import express, { response } from "express";
import { prisma } from "../../packages/db";
import { z } from "zod";
import { createClient } from "redis";

const app = express();

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

app.use(express.json());

const submissionSchema = z.object({
  code: z.string(),
  language: z.enum(["cpp", "python", "js"]),
});

//POST : "/api/submission"
/*
user will come and write code
*/
app.post("/api/submission", async (req, res) => {
  const { success, data } = submissionSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "inavlid input" });
  }

  const { code, language } = data;

  //save the code and language in db and push it to queue
  const problem = await prisma.submissions.create({
    data: {
      code,
      language,
    },
  });

  await client.lPush(
    "problem-submission",
    JSON.stringify({ submissionId: problem.id, code, language }),
  );

  res.json({
    message: "pending...",
    id: problem.id,
  });
});

//GET: "/api/submission/:submissionId"
/*
user will get response of code execution
*/
app.get("/api/submission/:submissionId", async (req, res) => {
  const { submissionId } = req.params;

  const executedSubmission = await prisma.submissions.findFirst({
    where: {
      id: submissionId,
    },
  });

  res.json({
    response: executedSubmission,
  });
});

app.listen(3000, () => console.log("sever running at port 3000"));
