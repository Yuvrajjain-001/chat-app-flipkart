import React from 'react';
import '../styles/singleChatview.css'
import InputBox from './InputBox';

const SingleChatView = ({ chat }) => {
  if (!chat) {
    return <div className="no-chat-selected">No chat selected</div>;
  }

  const { title, imageURL, orderId, messageList } = chat;
const onSendMessage=(e)=>{
return ""
}
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
{        console.log("message",messageList)
}      <div className="message-list">
        {messageList.length > 0 ? (
          messageList.map((message, index) => (
            <div key={index} className="message-item">
              <div className="message">{message.message} {formatTimestamp(message.timestamp)}</div>
             
              {/* <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span> */}
            </div>
          ))
        ) : (
          <div className="no-messages">No messages</div>
        )}
          <InputBox onSendMessage={onSendMessage}/>
        
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
