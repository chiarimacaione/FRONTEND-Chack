import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useWS from '../../hooks/useWS';
import { CreateCH, MessagesList, NewMessage } from '../../Components';
import './Workspace.css';

const Workspace = () => {
    const { workspace_id, channel_id } = useParams();
    const { isLoading, workspaces, getMessages } = useWS();
    const [messages, setMessages] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        if (workspace_id && channel_id) {
            // Llamar a getMessages cuando cambian workspace_id o channel_id
            getMessages(channel_id).then(fetchedMessages => {
                setMessages(fetchedMessages);
            });
        }
    }, [workspace_id, channel_id]);  // Solo depende de workspace_id y channel_id

    if (isLoading) {
        return <span>Loading...</span>;
    }

    // Buscar el workspace seleccionado
    const workspaceSelected = workspaces.find(workspace => workspace._id === Number(workspace_id));
    if (!workspaceSelected) {
        return <span>Workspace not found</span>;
    }

    // Buscar el canal seleccionado dentro del workspace
    const channelSelected = workspaceSelected.channels.find(channel => channel._id === Number(channel_id));
    if (!channelSelected) {
        return <span>Channel not found</span>;
    }

    // Function to update messages when a new message is sent
    const updateMessages = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <div className="workspace-div">
                <main className='workspace-main'>
                    <button className="hamburger-button" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <h2>{workspaceSelected.name}</h2>
                    <Link to='/home'>
                        <button className="exit-button">Exit</button>
                    </Link>
                </main>

                <div className="workspace-container">
                    <div className={`workspace-container-channels-sidebar ${isSidebarVisible ? '-visible' : '-hidden'}`}>
                        <h4>Channels</h4>
                        <ul className="channel-list">
                            {workspaceSelected.channels.map((channel) => (
                                <li key={channel._id}>
                                    <Link to={`/workspace/${workspaceSelected._id}/channel/${channel._id}`}>
                                        <span className="channel-hash">#</span> {channel.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <span className="add-channel">+
                            <CreateCH workspaceID={workspaceSelected._id}/>
                        </span>
                    </div>

                    <div className="workspace-container-messages">
                        <MessagesList messages={messages} channelName={channelSelected.name} />
                        <NewMessage
                            workspaceId={workspaceSelected._id}
                            channelId={channelSelected._id}
                            updateMessages={setMessages}
                            channelName={channelSelected.name}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Workspace;
