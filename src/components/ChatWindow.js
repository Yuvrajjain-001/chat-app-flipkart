import React, { useEffect, useState } from 'react';
import SingleChatView from './SignleChatView';
import '../styles/chatwindow.css'
const ChatWindow = () => {
  const [chats, setChats] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) => console.log(error));
  }, []);

  const handleChatItemClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (!chats || chats.length === 0) {
    return <div className="no-chats">No chats available</div>;
  }

  // Apply filter based on chat title or order ID
  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(filter.toLowerCase()) ||
      chat.orderId.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="chat-window">
      <div className="chat-filters">
        <input
          type="text"
          placeholder="Filter by Chat Title / Order ID"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="chat-list">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChatId === chat.id ? 'selected' : ''}`}
            onClick={() => handleChatItemClick(chat.id)}
          >
            <div className="chat-item-info">
              <img src={chat.imageURL} alt="Product" />
              <div>
                <div className="chat-item-title">{chat.title}</div>
                <div className="chat-item-order-id">{chat.orderId}</div>
                <div className="chat-item-date">
                  {formatDate(chat.latestMessageTimestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-messages">
        {selectedChatId ? (
          <SingleChatView chat={chats.find((chat) => chat.id === selectedChatId)} />
        ) : (
          <div className="no-chat-selected">Select a chat to view messages</div>
        )}
      </div>
    </div>
  );
};

// Helper function to format timestamp to DD/MM/YYYY format
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default ChatWindow;
