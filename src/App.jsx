import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import CreateWS from './Components/Workspaces/Create/CreateWS'
import Workspace from './Components/Workspaces/Workspace'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/workspace/new' element={<CreateWS />}/>
        <Route path='/workspace/:workspace_id/channel/:channel_id' element={<Workspace/>}></Route>
      </Routes>
    </div>
  )
}

export default App
