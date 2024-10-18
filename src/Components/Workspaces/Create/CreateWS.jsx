import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getRandomImage from '../../../../assets/images/getRandomImage'
import { validateWorkspace } from '../../../validations/validationsWS'
import { validateChannel } from '../../../validations/validationsCH'
import './CreateWS.css'

const CreateWS = () => {
    const [workspaceName, setWorkspaceName] = useState('')
    const [channelName, setChannelName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleCreate = (event) => {
        event.preventDefault()

        // Fetch current workspaces stored in localStorage
        const savedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || []

        // Validations
        const errorWS = validateWorkspace(workspaceName, savedWorkspaces)
        if (errorWS) {
            setErrorMessage(errorWS)
            return
        }

        const errorCH = validateChannel(channelName, savedWorkspaces)
        if (errorCH) {
            setErrorMessage(errorCH)
            return
        }

        // If validations succeed, clear the error message and continue
        setErrorMessage('')

        // Create new workspace object
        const newWorkspace = {
            id: Date.now(),  // unique ID
            name: workspaceName,
            img: getRandomImage(),
            channels: [
                {
                    id: Date.now(),
                    name: channelName,
                    messages: []  // Empty array for messages
                }
            ],
        }

        // Add the new workspace to the existing list
        const updatedWorkspaces = [...savedWorkspaces, newWorkspace]

        // Save the updated list to localStorage
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces))

        // Redirect to the main page
        navigate('/')
    }

    const handleCancel = (event) => {
        event.preventDefault()
        navigate('/')
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