import React from 'react'

const WorkspaceItem = ({ img, name, workspace_id, channel_id}) => {

  return (
    <div className='workspace-item'>
      <img src={img} alt='Workspace image' />
      <span>{name}</span>
    </div>
  )
}

export default WorkspaceItem
