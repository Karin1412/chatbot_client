import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatbotContainer = styled.div`
  width: 400px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Message = styled.div`
  background-color: ${props => props.isUser ? '#DCF8C6' : '#FFF'};
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0 0 0 10px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 0 0 10px 0;
  cursor: pointer;
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const newMessage = { text: input, isUser: true };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', { message: input });
      const botMessage = { text: response.data.reply, isUser: false };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatbotContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputContainer>
    </ChatbotContainer>
  );
};

export default Chatbot;
