import React, { useState } from 'react';
import './Chat.css';

function Chat({handlePromptReceived, handleInputSubmitted, handleImageReceived}) {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the user's input
    const userInput = message
    if(userInput === ''){return;}
    console.log('sending, ' + userInput)

    handleInputSubmitted(userInput)

    // Call the server-side API to send the user's message and get the AI's response
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });
  
    // Parse the response
    const responseData = await response.json();
    const cgptPrompt = responseData.reply.content

    // send back the userInput and response
    handlePromptReceived(cgptPrompt)
    
    // Call the server-side API to generate an image
    const imageResponse = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: responseData.reply.content }),
    });
  
    // Parse the image response
    const imageResponseData = await imageResponse.json();
  
    // Display the generated image
    console.log(imageResponseData.imageUrl);
    handleImageReceived(imageResponseData.imageUrl)
  };
  

  return (
    <div className="Chat">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message here"
        />
        <button type="submit" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
