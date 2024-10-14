import React from 'react'
import WorkspaceItem from '../ItemList/WorkspaceItem'
import useWS from '../../../hooks/useWS'
import { Link, useNavigate } from 'react-router-dom'
import './HomeWS.css' // Import the CSS

const HomeWS = () => {
  const { isLoading, workspaces } = useWS()
  const navigate = useNavigate();

  return (
    <div className='home-main-div'>
      <h2>Workspaces</h2>
      <main className='home-workspaces-mainlist'>
        {
          isLoading
            ? <span className='span-loading'>Loading...</span>
            : <div>
              {workspaces.map((workspace) => {
                const firstChannelID = workspace.channels.length > 0
                  ? workspace.channels[0].id
                  : null
                return (
                  <div className="workspace-item" key={workspace.id}>
                    {/* Pass workspace details as props */}
                    <WorkspaceItem
                      img={workspace.img}
                      name={workspace.name}
                      workspace_id={workspace.id} // Pass the ID as a prop if needed
                    />
                    <Link to={`/workspace/${workspace.id}/channel/${firstChannelID}`}>
                      <button>JOIN</button>
                    </Link>
                  </div>
                )
              })}
              {/* Create new workspace section */}
              <div className="create-workspace-container">
                <p>Want to use Chack with a different team?</p>
                <Link to='/workspace/new'>
                  <button>CREATE A NEW WORKSPACE</button>
                </Link>
              </div>
            </div>
        }
      </main>
    </div>
  )
}

export default HomeWS