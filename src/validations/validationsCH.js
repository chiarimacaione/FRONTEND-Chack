export const validateChannel = (channelName, savedWorkspaces) => {

    if (channelName.length < 3 || channelName.length > 16) {
        return 'Channel name must be between 3 and 16 characters.'
    }

    // Validate blanks and require hyphens
    const hasSpaces = /\s/;
    if (hasSpaces.test(channelName)) {
        return 'Channel name cannot contain spaces. Use hyphens (-) instead.'
    }

    if (channelName.trim() === '') {
        return 'Names cannot be empty or contain only spaces.'
    }

    const channelExists = savedWorkspaces.some(workspace =>
        workspace.channels.some(channel => channel.name === channelName)
    )
    if (channelExists) {
        return 'Channel name already exists.'
    }

    return null  // No error
}
