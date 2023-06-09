import React from 'react';

const Message = ({ message, previousMessage, isSameDate, formatDate }) => {
  const isCurrentUser = message.sender === 'user';
  const showDateLabel =
    !previousMessage || !isSameDate(message.timestamp, previousMessage.timestamp);

  return (
    <>
      {showDateLabel && (
        <div className="date-label">{formatDate(new Date(message.timestamp))}</div>
      )}
      <div className={`message ${isCurrentUser ? 'user-message' : ''}`}>
        {message.type === 'text' && <p>{message.content}</p>}
        {message.type === 'optionedMessage' && (
          <>
            <p>{message.content}</p>
            <div className="message-options">
              {message.options.map((option) => (
                <button key={option} disabled={!isCurrentUser}>
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Message;
