import React from 'react'
import { Link } from 'react-router-dom'

const WorkspaceItem = ({ img, name, workspace_id, channel_id}) => {

  return (
    <div className='workspace-item'>
      <img src={img} alt='Workspace image' />
      <span>{name}</span>
    </div>
  )
}

export default WorkspaceItem
