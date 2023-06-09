import React, { useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './styles.css';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="app">
      {/* <ChatList selectedChat={selectedChat} onSelectChat={handleChatSelect} /> */}
      {selectedChat && <ChatWindow selectedChat={selectedChat} />}
    </div>
  );
};

export default App;
