import React from 'react';

const MessageItem = ({ message, isOptionedMessage }) => {
  return (
    <div className={`message-item ${message.sender === 'BOT' ? 'left' : 'right'}`}>
      {isOptionedMessage ? (
        <div className="optioned-message">
          <p>{message.content}</p>
          <button disabled={!message.isLatest}>Request a Call</button>
        </div>
      ) : (
        <p>{message.content}</p>
      )}
    </div>
  );
};

export default MessageItem;
