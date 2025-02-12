import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { CreateWS, Workspace } from './Components/index';
import LoginScreen from './Components/User/Login/Login';
import RegisterScreen from './Components/User/Register/Register';
import Profile from './Components/User/Profile/Profile';
import ProtectedRoute from './/Context/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/workspace/new' element={<CreateWS />} />
        <Route path='/workspace/:workspace_id/channel/:channel_id' element={<Workspace />} />
        <Route path='/' element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        {/* Ruta protegida para el usuario */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/workspace/:workspace_id/channel/:channel_id/invite' element={<Workspace />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App