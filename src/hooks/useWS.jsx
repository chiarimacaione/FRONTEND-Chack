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
      const localWorkspaces = JSON.parse(localStorage.getItem('workspaces'))
      const savedWorkspaces = localWorkspaces || predefinedWorkspaces

      // Update state with all WS
      setWorkspaces(savedWorkspaces)
      setIsLoading(false)
    }

    //loadWorkspaces()

      setTimeout(() => {
        loadWorkspaces()
      }, 30)


  }, [])

  return { isLoading, workspaces }
}

export default useWS
