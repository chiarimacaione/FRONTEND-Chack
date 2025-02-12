import React from 'react';
import './MessageList.css'
import ENVIROMENT from '../../../config/enviroment.config';

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
                            <img
                                src={
                                    message.profilePicture?.includes('http')
                                        ? message.profilePicture
                                        : `${ENVIROMENT.URL_BACKEND}/${message.profilePicture?.replace(/^\/+/, '') || '/public/img-user/You.jpg'}`
                                }
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
