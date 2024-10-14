export const validateWorkspace = (workspaceName, savedWorkspaces) => {
    if (workspaceName.length < 3 || workspaceName.length > 16) {
        return 'Workspace name must be between 3 and 16 characters.'
    }

    // Validate blanks and require hyphens
    const hasSpaces = /\s/;
    if (hasSpaces.test(workspaceName)) {
        return 'Workspace name cannot contain spaces. Use hyphens (-) instead.'
    }

    if (workspaceName.trim() === '') {
        return 'Names cannot be empty or contain only spaces.'
    }

    const workspaceExists = savedWorkspaces.some(workspace => workspace.name === workspaceName)
    if (workspaceExists) {
        return 'Workspace name already exists.'
    }

    return null  // No error
}
