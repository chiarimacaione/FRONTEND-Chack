import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useWS from '../../hooks/useWS';
import CreateCH from '../Channels/CreateCH';
import MessagesList from '../Messages/List/MessagesList';
import NewMessage from '../Messages/New/NewMessage';
import './Workspace.css';

const Workspace = () => {
    const { workspace_id, channel_id } = useParams();
    const { isLoading, workspaces: initialWorkspaces } = useWS();
    const [workspaces, setWorkspaces] = useState(initialWorkspaces);

    // Actualizar el estado de los workspaces cuando el hook `useWS` cargue los datos
    useEffect(() => {
        setWorkspaces(initialWorkspaces);
    }, [initialWorkspaces]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    // Buscar el workspace seleccionado
    const workspaceSelected = workspaces.find(workspace => workspace.id === Number(workspace_id));
    if (!workspaceSelected) {
        return <span>Workspace not found</span>;
    }

    // Buscar el canal seleccionado dentro del workspace
    const channelSelected = workspaceSelected.channels.find(channel => channel.id === Number(channel_id));
    if (!channelSelected) {
        return <span>Channel not found</span>;
    }

    // Función para actualizar los mensajes cuando se envía un nuevo mensaje
    const updateMessages = (newMessage) => {
        const updatedWorkspaces = workspaces.map((workspace) => {
            if (workspace.id === workspaceSelected.id) {
                return {
                    ...workspace,
                    channels: workspace.channels.map((channel) => {
                        if (channel.id === channelSelected.id) {
                            return {
                                ...channel,
                                messages: [...channel.messages, newMessage],
                            };
                        }
                        return channel;
                    }),
                };
            }
            return workspace;
        });
        setWorkspaces(updatedWorkspaces);
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces)); // Guardar cambios en localStorage
    };

    // Función para agregar un nuevo canal al workspace
    const addNewChannel = (newChannel) => {
        const updatedWorkspaces = workspaces.map((workspace) => {
            if (workspace.id === workspaceSelected.id) {
                return {
                    ...workspace,
                    channels: [...workspace.channels, newChannel], // Agregar el nuevo canal
                };
            }
            return workspace;
        });
        setWorkspaces(updatedWorkspaces);
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces)); // Guardar cambios en localStorage
    };

    return (
        <>
            <main className='workspace-main'>
                <h2>{workspaceSelected.name}</h2>
                <Link to='/'>
                    <button className="exit-button">Exit</button>
                </Link>
            </main>
            <div className="workspace-container">
                <div className="workspace-container-channels-sidebar">
                    <h4>Channels</h4>
                    <ul className="channel-list">
                        {workspaceSelected.channels.map((channel) => (
                            <li key={channel.id}>
                                <Link to={`/workspace/${workspaceSelected.id}/channel/${channel.id}`}>
                                    <span className="channel-hash">#</span> {channel.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <span className="add-channel">+
                        <CreateCH workspaceID={workspaceSelected.id} addNewChannel={addNewChannel} />
                    </span>
                </div>


                <div className="workspace-container-messages">
                    <MessagesList messages={channelSelected.messages} channelName={channelSelected.name} />
                    <NewMessage
                        workspaceId={workspaceSelected.id}
                        channelId={channelSelected.id}
                        updateMessages={updateMessages}
                    />
                </div>
            </div>
        </>
    );

};

export default Workspace;
