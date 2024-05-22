const express = require('express');
const bodyParser = require('body-parser');
const { LangChain } = require('langchain'); 

const app = express();

app.use(bodyParser.json());

// Initialize LangChain
const langchain = new LangChain({
  apiKey: "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", //  LangChain API key
});

app.post('/api/ask', async (req, res) => {
  const { question, text } = req.body;

  try {
    const response = await langchain.qa({
      context: text,
      question: question,
    });

    res.json({ answer: response.answer });
  } catch (error) {
    console.error("Error processing the question:", error);
    res.status(500).json({ error: "An error occurred while processing your question." });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
