// popup.js

// Link to the gpt.js script
const gptScript = document.createElement('script');
gptScript.src = chrome.extension.getURL('gpt.js');
document.head.appendChild(gptScript);

// Function to extract job description using chrome.tabs API
function extractJobDescription() {
  const jobDescription = document.body.innerText; // Modify this based on your actual extraction logic
  return { jobDescription };
}

// Function to handle the modification of the resume using GPT
async function modifyResume() {
  try {
    // Extract job description from the current tab
    const response = await new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'extractJobDescription' }, resolve);
      });
    });

    const jobDescription = response?.jobDescription || '';

    if (jobDescription) {
      // Use the gpt.js function to generate a modified resume
      const modifiedResume = await generateResume(jobDescription);

      // Handle the modified resume (e.g., log it or update the UI)
      console.log('Modified Resume:', modifiedResume);

      // Replace this part with your logic to save or display the modified resume
      alert('Modified Resume: Check the console for the result.');
    } else {
      console.error('Failed to extract job description.');
    }
  } catch (error) {
    console.error('Error modifying resume:', error.message);
  }
}

// Event listener for the "Modify Resume" button
document.getElementById('modifyButton').addEventListener('click', modifyResume);
