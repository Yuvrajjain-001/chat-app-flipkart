import React, { useState } from 'react';
import '../styles/singleChatview.css';
import InputBox from './InputBox';

const SingleChatView = ({ chat }) => {
  if (!chat) {
    return <div className="no-chat-selected">No chat selected</div>;
  }

  const { id, title, imageURL, orderId, messageList } = chat;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [messages, setMessages] = useState(messageList);

  const onSendMessage = (text) => {
    const newMessage = {
      messageId: `msg${messages.length + 1}`,
      message: text,
      timestamp: Date.now(),
      sender: 'USER',
      messageType: 'text',
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="single-chat-view">
      <div className="chat-info">
        <div className="chat-header">
          <img src={imageURL} alt="Product" />
          <div>
            <div className="chat-title">{title}</div>
            <div className="chat-order-id">{orderId}</div>
          </div>
        </div>
      </div>
      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={message.messageId}
              className={`message-item ${message.sender === 'USER' ? 'right' : 'left'}`}
            >
              {message.message}
              <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages</div>
        )}
        <InputBox onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export default SingleChatView;
