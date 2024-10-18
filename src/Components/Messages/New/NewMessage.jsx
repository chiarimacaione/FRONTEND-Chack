import React, { useState } from 'react';
import './NewMessage.css';
import { Bold, Italic, Strikethrough, LinkIcon, ListOrdered, ListBulleted, Quote, Code, CodeBlock, SendNow } from '../../../../assets/icons';

const NewMessage = ({ workspaceId, channelId, updateMessages, channelName }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message.trim() === '') {
            return;
        }

        // Create new message
        const newMessage = {
            id: Date.now(), // unique ID
            author: 'You',
            text: message,
            img: "/img-user/You.jpg",
            timestamp: new Date().toLocaleString(),
        };

        updateMessages(newMessage);

        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="new-message-form">
            <div className="messages-icons">
                <Bold className='messages-icon-bold' />
                <Italic className='messages-icon-italic' />
                <Strikethrough className='messages-icon-strikethrough' />
                <LinkIcon className='messages-icon-link' />
                <ListOrdered className='messages-icon-list-ordered' />
                <ListBulleted className='messages-icon-list-bulleted' />
                <Quote className='messages-icon-quote' />
                <Code className='messages-icon-code' />
                <CodeBlock className='messages-icon-code-block' />
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${channelName}`}
                className="message-input"
            />
            <button type="submit" className="messages-icon-send-now">
                <SendNow />
            </button>
        </form>

    );

};

export default NewMessage