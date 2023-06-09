import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { filter } from 'lodash';
import '../styles/chatList.css'

const ChatList = ({ chats, selectedChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChatClick = (chatId) => {
    onSelectChat(chatId);
  };

  const filteredChats = filter(chats, (chat) => {
    const { title, orderId } = chat;
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      title.toLowerCase().includes(lowerCaseSearchQuery) ||
      orderId.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <div className="chat-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Title or Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul>
        {filteredChats.map((chat) => {
          const { id, title, imageURL, orderId, latestMessageTimestamp } = chat;
          const isSelected = id === selectedChatId;

          return (
            <li
              key={id}
              className={isSelected ? 'chat-item selected' : 'chat-item'}
              onClick={() => handleChatClick(id)}
            >
              <div className="chat-info">
                <img src={imageURL} alt={title} className="chat-image" />
                <div className="chat-details">
                  <div className="chat-title">{title}</div>
                  <div className="chat-order">{orderId}</div>
                  <div className="chat-date">
                    {format(latestMessageTimestamp, 'dd/MM/yyyy')}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ChatList.propTypes = {
  chats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      orderId: PropTypes.string.isRequired,
      latestMessageTimestamp: PropTypes.number.isRequired,
    })
  ),
  selectedChatId: PropTypes.number,
  onSelectChat: PropTypes.func.isRequired,
};

export default ChatList;
