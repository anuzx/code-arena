import { createClient } from "redis";

const client = createClient().on("error", (err) =>
  console.log("Redis Client Error", err),
);

client.connect().then(async () => {
  while (1) {
    const response = await client.rPop("problem-submission");

    if (!response) {
      await new Promise((r) => setTimeout(r, 1000));
      continue;
    }

    const parsedResponse = JSON.parse(response);

    //console.log(parsedResponse);

    const { language, code, submissionId } = parsedResponse;

    if (language === "js") {
      console.log("js language");
    }

    if (language === "cpp") {
      console.log("cpp language");
    }

    if (language === "python") {
      console.log("python language");
    }
  }
});
