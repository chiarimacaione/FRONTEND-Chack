import React, { useState } from 'react';
import './NewMessage.css';

const NewMessage = ({ workspaceId, channelId, updateMessages }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message.trim() === '') {
            return;
        }

        // Create new message
        const newMessage = {
            id: Date.now(), // Generate unique ID
            author: 'You',
            text: message,
            img: "/img-user/You.jpg",
            timestamp: new Date().toLocaleString(),
        };

        // Llamar a la función para actualizar los mensajes en el workspace y canal actuales
        updateMessages(newMessage);

        // Limpiar el campo de entrada
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="new-message-form">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
            />
            <button type="submit" className="send-button">Send</button>
        </form>
    );
    
    
};

export default NewMessage;
