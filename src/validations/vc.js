export const validateWorkspaceAndChannel = (workspaceName, channelName, savedWorkspaces) => {
    if (workspaceName.length < 3 || workspaceName.length > 16) {
        return 'Workspace name must be between 3 and 16 characters.'
    }

    if (channelName.length < 3 || channelName.length > 16) {
        return 'Channel name must be between 3 and 16 characters.'
    }

    // Validate blanks and require hyphens
    const hasSpaces = /\s/;
    if (hasSpaces.test(workspaceName)) {
        return 'Workspace name cannot contain spaces. Use hyphens (-) instead.'
    }

    if (workspaceName.trim() === '' || channelName.trim() === '') {
        return 'Names cannot be empty or contain only spaces.'
    }

    if (hasSpaces.test(channelName)) {
        return 'Channel name cannot contain spaces. Use hyphens (-) instead.'
    }

    const workspaceExists = savedWorkspaces.some(workspace => workspace.name === workspaceName)
    if (workspaceExists) {
        return 'Workspace name already exists.'
    }

    const channelExists = savedWorkspaces.some(workspace =>
        workspace.channels.some(channel => channel.name === channelName)
    )
    if (channelExists) {
        return 'Channel name already exists.'
    }


    return null  // No error
}
