import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default NewMessage;
