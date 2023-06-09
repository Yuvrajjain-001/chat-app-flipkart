import React from 'react';

const ChatListItem = ({ chat, isSelected, onSelectChat }) => {
  return (
    <div
      className={`chat-list-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectChat(chat)}
    >
      <div className="chat-item-info">
        <h4>{chat.name}</h4>
        <p>{chat.message}</p>
      </div>
      <span className="timestamp">{chat.timestamp}</span>
    </div>
  );
};

export default ChatListItem;
