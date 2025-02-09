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
                    messages.map((message, index) => (
                        <div key={message._id || `message-${index}`} className="message-item">
                            {/* Mostrar la foto de perfil */}
                            <img
                                src={message.profilePicture || '/default-avatar.png'}
                                alt="avatar"
                                className="message-avatar"
                            />
                            <div className="message-content">
                                <div className="message-header">
                                    <span className="message-author">{message.author}</span>
                                    <span className="message-time">{new Date(message.createdAt).toLocaleString()}</span>
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
