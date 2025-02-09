import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../User.css';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/users/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('Profile Data:', data);

                if (response.ok) {
                    setUser(data.user)
                } else {
                    setError(data.message || 'Error fetching profile');
                }
            } catch (err) {
                setError('Network error, please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <img 
    src={user?.profilePicture.startsWith('/') ? `http://localhost:3000${user.profilePicture}` : user.profilePicture} 
    alt="Profile Picture" 
    className="profile-image"

/>

            <p><strong>Nombre:</strong> {user?.name}</p>
            <p><strong>Correo:</strong> {user?.email}</p>
            <p><strong>Usuario:</strong> {user?.username}</p>
            <button onClick={() => navigate('/home')}>Go Back to Home</button>
        </div>
    );
};


export default Profile;
