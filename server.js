const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/gpt", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    console.error("GPT Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
