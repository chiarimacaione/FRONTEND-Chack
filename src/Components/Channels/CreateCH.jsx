import React, { useState } from 'react';
import { validateChannel } from '../../validations/validationsCH';
import useWS from '../../hooks/useWS';
import './CreateCH.css';

const CreateCH = ({ workspaceID, addNewChannel }) => {
    const [newChannel, setNewChannel] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Use hook to obtain workspaces and loading state
    const { workspaces, isLoading } = useWS();

    const toggleNewChannel = () => {
        setNewChannel(!newChannel);
    };

    const handleCreateChannel = (e) => {
        e.preventDefault();

        // Validations
        const error = validateChannel(channelName, workspaces);
        if (error) {
            setErrorMessage(error);
            return;
        }

        // If validation is successful, continue with creation
        setErrorMessage('');
        //console.log(`Creating channel: ${channelName}`);

        // Create new channel
        const newChannelObj = {
            id: Date.now(), // unique ID
            name: channelName,
            messages: [] // No messages yet
        };

        // Send the new channel to the parent component
        addNewChannel(newChannelObj);

        // Reset form
        setChannelName('');
        setNewChannel(false);
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