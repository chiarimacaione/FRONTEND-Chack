import React, { useState } from 'react'
import { validateChannel } from '../../validations/validationsCH'
import useWS from '../../hooks/useWS'  // Importar el hook personalizado

const CreateCH = ({ workspaceID }) => {
    const [newChannel, setNewChannel] = useState(false)
    const [channelName, setChannelName] = useState('#')
    const [errorMessage, setErrorMessage] = useState('')

    // Usar el hook para obtener los workspaces y el estado de carga
    const { workspaces, isLoading } = useWS()

    const toggleNewChannel = () => {
        setNewChannel(!newChannel);
    }

    const handleCreateChannel = (e) => {
        e.preventDefault()

        // Validaciones
        const error = validateChannel(channelName, workspaces)
        if (error) {
            setErrorMessage(error)
            return
        }

        // Si la validación es correcta, continúa con la creación
        setErrorMessage('')
        console.log(`Creating channel: ${channelName}`)
        
        // Buscar el workspace al que se le agregará el canal
        const updatedWorkspaces = workspaces.map((workspace) => {
            if (workspace.id === workspaceID) {
                // Agregar el nuevo canal al array de canales del workspace
                const newChannelObj = {
                    id: Date.now(), // Generar un ID único para el canal
                    name: channelName,
                    messages: [] // Inicialmente, el canal no tiene mensajes
                };
                return {
                    ...workspace,
                    channels: [...workspace.channels, newChannelObj] // Agregar el nuevo canal
                };
            }
            return workspace; // Si no es el workspace correcto, retornarlo sin cambios
        });

        // Actualizar el localStorage con los nuevos datos
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces))

        // Resetear el formulario
        setChannelName('#')
        setNewChannel(false)
    }

    // Mostrar un mensaje mientras los workspaces se están cargando
    if (isLoading) {
        return <p>Loading workspaces...</p>
    }

    return (
        <div>
            <button onClick={toggleNewChannel}>Add new channel
                {newChannel ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}
            </button>
            {/* Si el menú está abierto, mostrar el formulario */}
            {newChannel && (
                <form onSubmit={handleCreateChannel}>
                    <input 
                        type="text"
                        placeholder="Channel name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                    />
                    <button type="submit">Create</button>
                    <button type="button" onClick={toggleNewChannel}>Cancel</button>
                </form>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default CreateCH
