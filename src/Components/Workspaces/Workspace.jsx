import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useWS from '../../hooks/useWS';
import Swal from 'sweetalert2';
import { CreateCH, MessagesList, NewMessage } from '../../Components';
import './Workspace.css';
import jwt_decode from 'jwt-decode';
import ENVIROMENT from '../../config/enviroment.config';

const Workspace = () => {
    const { workspace_id, channel_id } = useParams();
    const { isLoading, workspaces, getMessages, fetchWorkspaces } = useWS();
    const [messages, setMessages] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        if (workspace_id && channel_id) {
            getMessages(channel_id).then(fetchedMessages => {
                setMessages(fetchedMessages);
            });
        }
    }, [workspace_id, channel_id]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    const workspaceSelected = workspaces.find(workspace => workspace._id === Number(workspace_id));
    if (!workspaceSelected) {
        return <span>Workspace not found</span>;
    }

    const channelSelected = workspaceSelected.channels.find(channel => channel._id === Number(channel_id));
    if (!channelSelected) {
        return <span>Channel not found</span>;
    }

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const getEmailFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken.email;
        }
        return null;
    };
    const handleInviteUser = async () => {
        const { value: email } = await Swal.fire({
            title:`Add user to ${workspaceSelected.name}`,
            input: 'email',
            inputLabel: "Enter user's email address",
            inputPlaceholder: "User's email address",
            showCancelButton: true,
            confirmButtonColor: "#611f69",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add user!",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
                if (!value || !validateEmail(value)) {
                    return 'Please enter a valid email address';
                }
            }
        });

        if (email) {
            setIsInviting(true);

            try {
                const response = await fetch(`${ENVIROMENT.URL_BACKEND}/workspaces/${workspaceSelected._id}/invite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: 'User Added',
                        text: `The user with email ${email} has been added to the workspace.`,
                        icon: 'success',
                        confirmButtonText: 'Awesome!',
                    });
                    
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'There was a problem adding the user. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                setIsInviting(false);
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    return (
        <div className="workspace-div">
            <main className='workspace-main'>
                <button className="hamburger-button" onClick={toggleSidebar}>☰</button>
                <h2>{workspaceSelected.name}</h2>
    
                
    
                <div className="button-container">
                    {workspaceSelected.owner.email === getEmailFromToken() && (
                    <button
                        className="generate-invitation-button"
                        onClick={handleInviteUser}
                        disabled={isInviting}
                    >
                        {isInviting ? 'Adding...' : 'Add user'}
                    </button>
                )}
                    <Link to='/home'>
                        <button className="exit-button">Exit</button>
                    </Link>
                </div>
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
                    <span className="add-channel">
                        + <CreateCH workspaceID={workspaceSelected._id} fetchWorkspaces={fetchWorkspaces} />
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
    );
    
};

export default Workspace;
