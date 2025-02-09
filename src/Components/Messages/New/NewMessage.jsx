import React, { useState } from 'react';
import './NewMessage.css';
import { Bold, Italic, Strikethrough, LinkIcon, ListOrdered, ListBulleted, Quote, Code, CodeBlock, SendNow } from '../../../../assets/icons';
import axios from 'axios'

const NewMessage = ({ workspaceId, channelId, updateMessages, channelName }) => {
    const [message, setMessage] = useState('');

    const getUserId = () => {
        const token = localStorage.getItem('token'); // Obtén el token
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1]; // Obtiene la parte del payload del JWT
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Normaliza el formato
            const decodedPayload = JSON.parse(atob(base64)); // Decodifica el JSON
            return decodedPayload.id; // Devuelve el ID del usuario desde el payload
        } catch (error) {
            console.error('Error al decodificar el token:', error)
            return null
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (message.trim() === "") {
            return;
        }

        const newMessage = {
            author_id: getUserId(), // ID del autor
            channel_id: channelId, // ID del canal
            text: message, // Contenido del mensaje
        };

        try {
            const response = await axios.post('http://localhost:3000/api/messages', newMessage);

            if (response.data.ok) {
                const createdMessage = response.data.data;

                console.log('Mensaje recibido:', createdMessage);

                updateMessages((prevMessages) => [...prevMessages, createdMessage]);
            } else {
                console.error('Error al crear mensaje:', response.data.message);
            }

            setMessage('');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
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