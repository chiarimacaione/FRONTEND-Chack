import { useEffect, useState } from 'react'
import data from '../data/data.json' // Import static workspaces from data.json

const useWS = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWorkspaces = () => {
      // Get WS from data.json
      const predefinedWorkspaces = data

      // Get WS from localStorage
      const localWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || []

      // Merge both workspaces (predefined and saved)
      const allWorkspaces = [...predefinedWorkspaces, ...localWorkspaces]

      // Update state with merged WS
      setWorkspaces(allWorkspaces)
      setIsLoading(false)
    }

    loadWorkspaces()
  }, [])

  return { isLoading, workspaces }
}

export default useWS
