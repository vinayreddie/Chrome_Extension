// gpt.js

const GPT_API_KEY = 'YOUR_GPT_API_KEY'; // Replace with your GPT API key
const GPT_ENDPOINT = 'https://api.openai.com/v1/engines/davinci/completions'; // Adjust based on your GPT engine

async function generateResume(modifyText) {
  try {
    const response = await fetch(GPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GPT_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: modifyText,
        max_tokens: 200, // Adjust based on the desired length of the generated text
      }),
    });

    if (!response.ok) {
      throw new Error(`GPT API error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    return result.choices[0]?.text || '';
  } catch (error) {
    console.error('Error communicating with GPT API:', error.message);
    return '';
  }
}

// Example usage:
// const modifiedResume = await generateResume('Original resume text to modify.');
// console.log('Modified Resume:', modifiedResume);
