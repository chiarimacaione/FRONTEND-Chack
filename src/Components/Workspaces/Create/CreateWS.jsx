import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getRandomImage from '../../../../assets/images/getRandomImage.js';
import { validateWorkspace } from '../../../validations/validationsWS'
import { validateChannel } from '../../../validations/validationsCH'
import axios from 'axios'
import './CreateWS.css'

const CreateWS = () => {
    const [workspaceName, setWorkspaceName] = useState('')
    const [channelName, setChannelName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleCreate = async (event) => {
        event.preventDefault();
    
        // Validaciones
        const errorWS = validateWorkspace(workspaceName);
        if (errorWS) {
            setErrorMessage(errorWS);
            return;
        }
    
        const errorCH = validateChannel(channelName);
        if (errorCH) {
            setErrorMessage(errorCH);
            return;
        }
    
        // Limpiar errores antes de continuar
        setErrorMessage('');
    
        // Crear objeto de workspace
        const newWorkspace = {
            name: workspaceName,
            img: getRandomImage() || "/img-WS/Team Hub.jpg",
            channels: [
                {
                    name: channelName,
                    messages: [],
                }
            ],
        };
    
        try {
            // Obtener el token del localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('No authentication token found.');
                return;
            }
    
            // Enviar la solicitud al backend
            const response = await axios.post(
                'http://localhost:3000/workspaces',
                newWorkspace,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Si la respuesta es exitosa, redirigir
            if (response.status === 201) {
                console.log('Workspace creado:', response.data);
                navigate('/home');
            } else {
                setErrorMessage('Error creating workspace. Please try again.');
            }
        } catch (error) {
            console.error('Error creating workspace:', error);
    
            // Capturar el mensaje del backend si existe
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error creating workspace. Please try again.');
            }
        }
    };
    

    const handleCancel = (event) => {
        event.preventDefault()
        navigate('/home')
    }

    return (
        <div className="create">
            <div className="new-workspace">
                <h2 className='new-workspace-title'>Create New Workspace</h2>
                <form onSubmit={handleCreate}>
                    <div className="new-workspace-form">
                        <label htmlFor='name-WS'>Workspace name</label>
                        <input
                            id='name-WS'
                            name='name-WS'
                            type="text"
                            value={workspaceName}
                            onChange={(event) => setWorkspaceName(event.target.value)}
                            placeholder="Ex: Team Hub"
                        />
                    </div>
                    <div className="new-workspace-form">
                        <label htmlFor='name-CH'>Channel name</label>
                        <input
                            id='name-CH'
                            name='name-CH'
                            type="text"
                            value={channelName}
                            onChange={(event) => setChannelName(event.target.value)}
                            placeholder="Ex: General"
                        />
                    </div>
                    <div className="new-workspace-error-message">
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                    <div className="new-workspace-buttons">
                        <button type="submit" className='submit-btn'>Confirm</button>
                        <button onClick={handleCancel} className='cancel-btn'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWS
