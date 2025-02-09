export const validateWorkspace = (workspaceName, savedWorkspaces) => {
    if (!Array.isArray(savedWorkspaces)) {
        savedWorkspaces = []
    }

    // Validación de longitud de nombre de workspace
    if (workspaceName.length < 3 || workspaceName.length > 16) {
        return 'Workspace name must be between 3 and 16 characters.';
    }

    // Validación de nombre vacío o solo espacios
    if (workspaceName.trim() === '') {
        return 'Names cannot be empty or contain only spaces.';
    }

    // Verificar si ya existe un workspace con el mismo nombre
    const workspaceExists = savedWorkspaces.some(workspace => workspace.name === workspaceName);
    if (workspaceExists) {
        return 'Workspace name already exists.';
    }

    return null; // No hay errores
}