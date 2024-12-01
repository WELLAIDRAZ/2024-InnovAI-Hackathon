import React, { useState, useEffect } from 'react';
import { ReactTyped } from "react-typed";
import { Bot } from 'lucide-react';
import axios from 'axios';

const LeftPad = ({ firstResponse }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Set the first response when the component mounts
    if (firstResponse) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: firstResponse }
      ]);
    }
  }, [firstResponse]);  // Runs when firstResponse changes

  const formatMessage = (message) => {
    // Break message into new lines when a number or a list item is detected
    let formattedMessage = message
      .replace(/(\d+\.)/g, '$1') // Adds newline before numbered lists
      .replace(/- /g, '- ') // Adds newline before list items
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Make bold text inside **

    // Return the formatted message
    return formattedMessage.split('\n').map((line, index) => (
      <div key={index} style={styles.message}>
        <span dangerouslySetInnerHTML={{ __html: line }} />
      </div>
    ));
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // API call to the Python Flask server
      const response = await axios.post('http://127.0.0.1:5000/api/chat', {
        input: `based on my vitals signs ${firstResponse} answer the user question ${input}`
      });

      // Assuming the response is a JSON object containing the 'response' field
      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
      console.log("Bot response:", response.data.response);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error fetching response from the chatbot API.' },
      ]);
      console.error('Error during API call:', error);
    }

    setInput('');
  };

  return (
    <div className="hidden bg-primary-foreground lg:flex lg:flex-col lg:items-center lg:justify-center bg-[length:200%_200%] animate-gradient-move">
      <div className="flex display-center items-center gap-2 mb-2 mt-2 text-start font-bold text-secondary-foreground text-3xl">
        <Bot className="h-10 w-10" />
        <ReactTyped
          strings={["Hi! I'm your AI Assistant, let's discuss!"]}
          typeSpeed={80}
          showCursor={false}
          startDelay={500}
          loop={false}
          shuffle={true}
        />
        <Bot className="h-10 w-10" />
      </div>

      <div className='mb-2' style={styles.container}>
        <div style={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#ECECEC',
              }}
            >
              {msg.sender === 'bot' ? formatMessage(msg.text) : msg.text}
            </div>
          ))}
        </div>

        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button style={styles.button} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '95%',
    height: '95%',
    maxHeight: '80vh',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  chatBox: {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    maxHeight: '90%',
  },
  message: {
    padding: '10px',
    borderRadius: '8px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: 'none',
    outline: 'none',
  },
  button: {
    padding: '10px',
    background: 'hsl(217, 46%, 42%)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LeftPad;
