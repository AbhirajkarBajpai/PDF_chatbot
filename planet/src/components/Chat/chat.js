import React, { useState } from "react";
import axios from "axios";
import "./chat.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatInterface = ({ pdfText }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = { user: "You", text: inputMessage };
      setMessages([...messages, newMessage]);

      try {
        await axios.post("http://localhost:8000/messages/", newMessage);
        const response = await axios.post("http://localhost:3001/api/ask", {
          question: inputMessage,
          text: pdfText
        });

        if (response.data && response.data.answer) {
          setMessages((prevMessages) => [...prevMessages, { user: "Planet AI", text: response.data.answer }]);
          await axios.post("http://localhost:8000/messages/", { user: "Planet AI", text: response.data.answer });
        } else {
          setMessages((prevMessages) => [...prevMessages, { user: "Planet AI", text: "Sorry, I couldn't find an answer." }]);
          await axios.post("http://localhost:8000/messages/", { user: "Planet AI", text: "Sorry, I couldn't find an answer." });
        }
      } catch (error) {
        console.error("Error getting the answer:", error);
        setMessages((prevMessages) => [...prevMessages, { user: "Planet AI", text: "An error occurred while processing your question." }]);
        await axios.post("http://localhost:8000/messages/", { user: "Planet AI", text: "An error occurred while processing your question." });
      }

      setInputMessage("");
    }
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === "You" ? "user-message" : "ai-message"}`}>
            <strong>{message.user}: </strong>{message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Send a message..."
        />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
