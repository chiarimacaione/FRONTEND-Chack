import React, { useState } from 'react';
import { validateChannel } from '../../validations/validationsCH';
import useWS from '../../hooks/useWS';
import './CreateCH.css';

const CreateCH = ({ workspaceID, addNewChannel }) => {
    const [newChannel, setNewChannel] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Usar el hook para obtener los workspaces y el estado de carga
    const { workspaces, isLoading } = useWS();

    const toggleNewChannel = () => {
        setNewChannel(!newChannel);
    };

    const handleCreateChannel = (e) => {
        e.preventDefault();

        // Validaciones
        const error = validateChannel(channelName, workspaces);
        if (error) {
            setErrorMessage(error);
            return;
        }

        // Si la validación es correcta, continúa con la creación
        setErrorMessage('');
        console.log(`Creating channel: ${channelName}`);

        // Crear el nuevo canal
        const newChannelObj = {
            id: Date.now(), // Generar un ID único para el canal
            name: channelName,
            messages: [] // Inicialmente, el canal no tiene mensajes
        };

        // Pasar el nuevo canal al componente padre
        addNewChannel(newChannelObj);

        // Resetear el formulario
        setChannelName('');
        setNewChannel(false);
    };

    // Mostrar un mensaje mientras los canales se están cargando
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

            {/* Si el menú está abierto, mostrar el formulario */}
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

export default CreateCH;
