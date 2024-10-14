import React from 'react';
import './MessageList.css'

const MessagesList = ({ messages, channelName }) => {
    return (
        <div className="messages-list-container">
            <h4 className="channel-title">Messages in {channelName}</h4>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <img src={message.img} alt="avatar" className="message-avatar" />
                        <div className="message-content">
                            <div className="message-header">
                                <b className="message-author">{message.author}</b>
                                <span className="message-time">{message.time}</span>
                            </div>
                            <div className="message-text">{message.text}</div>
                            <div className="message-reactions">
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-messages">No messages in this channel yet.</p>
            )}
        </div>
    );
};

export default MessagesList;