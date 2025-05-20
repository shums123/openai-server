const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/gpt", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error("GPT Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
