import { useEffect, useState } from 'react';
import axios from 'axios';
import ENVIROMENT from '../config/enviroment.config';

const useWS = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspaces = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token
      if (!token) {
        console.error('No token found in localStorage', token);
        return;
      }

      const response = await axios.get(`${ENVIROMENT.URL_BACKEND}/workspaces`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response (hook):', response.data);
      setWorkspaces(response.data.data.workspaces || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // Función para obtener los mensajes de un canal específico
  const getMessages = async (channelId) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token
      if (!token) {
        console.error('No token found in localStorage');
        return [];
      }

      const response = await axios.get(`${ENVIROMENT.URL_BACKEND}/api/messages/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.messages || [];

    } catch (error) {
      if (error.response && error.response.status === 404) {
            console.warn(`No messages found for channel ${channelId}, returning empty array.`);
            return [];
        }
        console.error('Error fetching messages:', error);
        return [];
    }
  };

  return { isLoading, workspaces, getMessages, fetchWorkspaces };
};

export default useWS;
