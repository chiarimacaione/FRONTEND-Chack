import React from 'react';
import WorkspaceItem from '../ItemList/WorkspaceItem';
import useWS from '../../../hooks/useWS';
import { Link } from 'react-router-dom';
import './HomeWS.css';

const HomeWS = () => {
  const { isLoading, workspaces } = useWS();

  return (
    <div className='home-main-div'>
      <div className='header-container'>
        <h2>Workspaces</h2>
      </div>

      <main className='home-workspaces-mainlist'>
        {isLoading ? (
          <span className='span-loading'>Loading...</span>
        ) : (
          <div>
            {workspaces.length > 0 ? (
              workspaces.map((workspace) => {
                const ChannelID =
                  workspace.channels?.length > 0 ? workspace.channels[0]._id : null;
                return (
                  <div className="workspace-item" key={workspace._id}>
                    <WorkspaceItem
                      key={workspace._id}
                      img={workspace.img}
                      name={workspace.name}
                      workspace_id={workspace._id}
                    />
                    {ChannelID && (
                      <Link to={`/workspace/${workspace._id}/channel/${ChannelID}`}>
                        <button>JOIN</button>
                      </Link>
                    )}
                  </div>
                );
              })
            ) : (
              <h3>No workspaces found. Create one!</h3>
            )}


            {/* Sección para crear un nuevo workspace */}
            <div className="create-workspace-container">
              <p>Want to use Chack with a different team?</p>
              <Link to='/workspace/new'>
                <button>CREATE A NEW WORKSPACE</button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomeWS;
