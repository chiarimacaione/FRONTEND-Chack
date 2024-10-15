import React from 'react';
import './MessageList.css'

const MessagesList = ({ messages, channelName }) => {
    return (
        <>
        <nav className='nav-channel-title'>
                <h4 className="channel-title"># {channelName}</h4>
            </nav>
        <div className="messages-list-container">
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <img src={message.img} alt="avatar" className="message-avatar" />
                        <div className="message-content">
                            <div className="message-header">
                                <span className="message-author">{message.author}</span>
                                <span className="message-time">{message.timestamp}</span>
                            </div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-messages">No messages in this channel yet.</p>
            )}
            </div>    
        </>
    );
};

export default MessagesList;