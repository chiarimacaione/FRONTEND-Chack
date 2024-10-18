import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useWS from '../../hooks/useWS';
import { CreateCH, MessagesList, NewMessage } from '../../Components';
import './Workspace.css';

const Workspace = () => {
    const { workspace_id, channel_id } = useParams();
    const { isLoading, workspaces: initialWorkspaces } = useWS();
    const [workspaces, setWorkspaces] = useState(initialWorkspaces);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // Update the state of the workspaces when the `useWS` hook loads the data
    useEffect(() => {
        setWorkspaces(initialWorkspaces);
    }, [initialWorkspaces]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    // Search for the selected workspace
    const workspaceSelected = workspaces.find(workspace => workspace.id === Number(workspace_id));
    if (!workspaceSelected) {
        return <span>Workspace not found</span>;
    }

    //Search for the selected channel within the workspace
    const channelSelected = workspaceSelected.channels.find(channel => channel.id === Number(channel_id));
    if (!channelSelected) {
        return <span>Channel not found</span>;
    }

    // Function to update messages when a new message is sent
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
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces)); // Save changes in localStorage
    };

    // Function to add a new channel to the ws
    const addNewChannel = (newChannel) => {
        const updatedWorkspaces = workspaces.map((workspace) => {
            if (workspace.id === workspaceSelected.id) {
                return {
                    ...workspace,
                    channels: [...workspace.channels, newChannel],
                };
            }
            return workspace;
        });
        setWorkspaces(updatedWorkspaces);
        localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces));
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        console.log(isSidebarVisible);
    };

    return (
        <>
            <div className="workspace-div">
                <main className='workspace-main'>
                    <button className="hamburger-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <h2>{workspaceSelected.name}</h2>
                    <Link to='/'>
                        <button className="exit-button">Exit</button>
                    </Link>

                </main>

                <div className="workspace-container">
                    <div className={`workspace-container-channels-sidebar ${isSidebarVisible ? '-visible' : '-hidden'}`}>
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
                            channelName={channelSelected.name}
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default Workspace