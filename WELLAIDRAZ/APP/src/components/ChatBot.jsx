import { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // API call to the Python Flask server
      const response = await axios.post('http://127.0.0.1:5000/api/chat', {
        input: input
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
    <div style={styles.container}>
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
            {msg.text}
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
  );
}

  const styles = {
    container: {
      width: '95%',
      height: '95%',
      maxHeight: '95vh',
      margin_bottom: '10 ',
      border: '1px solid #ccc',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',  // Add position relative to position child absolutely
    },
    chatBox: {
      flex: 1,
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflowY: 'auto',
      maxHeight: '400px',
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
      position: 'absolute',  // Position input container at the bottom
      bottom: 0,  // Align to the bottom of the container
      width: '100%',
      backgroundColor: '#fff', // Optional, for better visibility of input field
    },
    input: {
      flex: 1,
      padding: '10px',
      border: 'none',
      outline: 'none',
    },
    button: {
      padding: '10px',
      background: '#007BFF',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    },
  };

export default Chatbot;
