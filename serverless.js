// serverless.js

const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIAPI } = require('openai'); // Make sure to install the 'openai' package

const app = express();
const port = process.env.PORT || 3000;

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const openai = new OpenAIAPI({ key: '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' });

app.use(bodyParser.json());

app.post('/process-job-description', async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;

    // Use the OpenAI API to generate a modified resume
    const result = await openai.complete({
      engine: 'davinci',
      prompt: `Modify the resume based on the following job description: ${jobDescription}`,
      max_tokens: 200, // Adjust based on the desired length of the generated text
    });

    const modifiedResume = result.choices[0]?.text || '';

    // Send the modified resume as the response
    res.json({ modifiedResume });
  } catch (error) {
    console.error('Error processing job description:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
