import React, { useState } from 'react';
import { validateChannel } from '../../validations/validationsCH';
import useWS from '../../hooks/useWS';
import './CreateCH.css';
import ENVIROMENT from '../../config/enviroment.config';


const CreateCH = ({ workspaceID, addNewChannel = () => { } }) => {
    const [newChannel, setNewChannel] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Use hook to obtain workspaces and loading state
    const { workspaces, isLoading } = useWS();

    const toggleNewChannel = () => {
        setNewChannel(!newChannel)
    };

    const handleCreateChannel = async (e) => {
        e.preventDefault()

        if (!workspaces || workspaces.length === 0) {
            setErrorMessage('Workspaces not loaded yet. Try again.');
            return;
        }

        const error = validateChannel(channelName, workspaces);
        if (error) {
            setErrorMessage(error);
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Obtener el token
            const response = await fetch(`${ENVIROMENT.URL_BACKEND}/channels/${workspaceID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({ name: channelName })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error creating channel');
            }

            // Agregar el nuevo canal al estado del componente padre
            addNewChannel(data.data.new_channel); // Aquí se pasa el canal creado al padre


            console.log('Channel created:', data.data.new_channel);

            // Resetear formulario
            setChannelName('');
            setNewChannel(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };



    if (isLoading) {
        return <p>Loading channels...</p>;
    }

    return (
        <div className="channel-container">
            <button className="toggle-channel-btn" onClick={toggleNewChannel}>
                Add new channel
                {newChannel ? (
                    <i className="fa-solid fa-minus toggle-icon"></i>
                ) : (
                    <i className="fa-solid fa-plus toggle-icon"></i>
                )}
            </button>

            {newChannel && (
                <form className="new-channel-form" onSubmit={handleCreateChannel}>
                    <input
                        className="channel-input"
                        type="text"
                        placeholder="Channel name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                    <div className="form-buttons">
                        <button className="submit-btn" type="submit">Create</button>
                        <button className="cancel-btn" type="button"
                            onClick={() => {
                                toggleNewChannel();
                                setChannelName('');
                                setErrorMessage('');
                            }}
                        >Cancel</button>
                    </div>
                </form>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default CreateCH