// try {
//     // hume jo bhi karwana hai wo try expression me jayega
// } catch (error) {
//     // lekin agar jo try karwa rahe hai usme koi error aata so it will 
//     // automatically show the error through the catch expression
// }



const API_URL = "PASTE_YOUR_API_URL"; // Replace with your OpenAI chat completions API endpoint
const userInputElement = document.getElementById("user-input");
const submitButtonElement = document.getElementById("submit-button");
const chatHistoryElement = document.getElementById("chat-history");
const API_KEY = "PASTE_YOUR_API_SECRET_KEY_HERE"; // Replace with your OpenAI API key

// Event Listener for Submit Button Click
submitButtonElement.addEventListener("click", async () => {

  // Capture User Prompt and Handle Empty Prompts (Optional)
  const userPrompt = userInputElement.value.trim();
  if (userPrompt.length === 0) {
    return; // You can add an optional message here to prompt the user for input
  }

  try {
    // Fetch Response from OpenAI API
    const response = await fetch(API_URL, {
      method: "POST", // Send a POST request
      headers: {
        "Content-Type": "application/json", // Indicate JSON data
        "Authorization": `Bearer ${API_KEY}`, // Authorization header with your API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Choose an appropriate OpenAI model (e.g., text-davinci-003)
        "messages": [  // Structure the prompt as a conversation history
          {
            "role": "user",
            "content": userPrompt
          }
        ],
        max_tokens: 1024, // Adjust the maximum response length as needed
        temperature: 0.7, // Controls randomness (0 = deterministic, 1 = more creative)
        top_p: 1, // Controls how likely the model is to pick repetitive responses
      }),
    });

    // Handle Errors
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse Response Data
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Update Chat History
    const userMessageElement = document.createElement("li");
    userMessageElement.classList.add("user-message");
    userMessageElement.textContent = userPrompt;
    chatHistoryElement.appendChild(userMessageElement);

    const aiMessageElement = document.createElement("li");
    aiMessageElement.classList.add("ai-message");
    aiMessageElement.textContent = aiResponse;
    chatHistoryElement.appendChild(aiMessageElement);

    userInputElement.value = ""; // Clear input field
  } catch (error) {
    console.error("Error fetching response:", error);
    // Handle errors appropriately (e.g., display an error message to the user)
  }
});

