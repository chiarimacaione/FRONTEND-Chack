import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getRandomImage from '../../../../assets/images/getRandomImage'
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
        event.preventDefault()

        // Validations
        const errorWS = validateWorkspace(workspaceName)
        if (errorWS) {
            setErrorMessage(errorWS)
            return
        }

        const errorCH = validateChannel(channelName)
        if (errorCH) {
            setErrorMessage(errorCH)
            return
        }

        // If validations succeed, clear the error message and continue
        setErrorMessage('')

        // Create new workspace object
        const newWorkspace = {
            name: workspaceName,
            img: getRandomImage(),
            channels: [
                {
                    name: channelName,
                    messages: []  // Empty array for messages
                }
            ],
        }

        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token')
            console.log(token)
            if (!token) {
                console.error('No token found in localStorage')
                return
            }

            // Send the new workspace data to the backend
            const response = await axios.post(
                'http://localhost:3000/workspaces',  // Tu ruta del backend para crear workspaces
                newWorkspace,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Enviar el token para autenticar al usuario
                    },
                }
            )
            console.log('response:', response)
            // Check if the workspace was successfully created
            if (response.status === 201) {
                console.log('Workspace created successfully:', response.data)
                navigate('/home')  // Redirigir a la página principal
            } else {
                setErrorMessage('Error creating workspace. Please try again.')
            }
        } catch (error) {
            console.error('Error creating workspace:', error)
            setErrorMessage('Error creating workspace. Please try again.')
        }
    }

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
