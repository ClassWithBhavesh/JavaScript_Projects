// try {
//     // hume jo bhi karwana hai wo try expression me jayega
// } catch (error) {
//     // lekin agar jo try karwa rahe hai usme koi error aata so it will 
//     // automatically show the error through the catch expression
// }



const API_URL = "PASTE_YOUR_API_URL";
const userInputElement = document.getElementById("user-input");
const submitButtonElement = document.getElementById("submit-button");
const chatHistoryElement = document.getElementById("chat-history");
const API_KEY = "PASTE_YOUR_API_SECRET_KEY_HERE";

submitButtonElement.addEventListener("click", async () => {
  const userPrompt = userInputElement.value.trim();

  if (userPrompt.length === 0) {
    return; // Handle empty prompts (optional)
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Choose an appropriate model (e.g., text-davinci-003)
        "messages" : [
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

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Update chat history
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
