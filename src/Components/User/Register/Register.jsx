import React, { useState } from 'react';
import useForm from '../../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import '../User.css';
import ENVIROMENT from '../../../config/enviroment.config';

const RegisterScreen = () => {
    const navigate = useNavigate();
    const { formState, handleChangeInput } = useForm({ username: '', email: '', password: '', name: '', profilePicture: null });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type. Please upload a PNG, JPG, or JPEG image.");
                return;
            }
            formState.profilePicture = file;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formState.username || !formState.email || !formState.password || !formState.name || !formState.profilePicture) {
            setError('All fields are required.');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('username', formState.username);
        formData.append('email', formState.email);
        formData.append('password', formState.password);
        formData.append('name', formState.name);
        formData.append('profilePicture', formState.profilePicture);

        try {
            const response = await fetch(`${ENVIROMENT.URL_BACKEND}/users/register`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('Registration successful. A verification email has been sent. Please check your mailbox.');
            } else {
                setError(data.message || 'Error registering user.');
            }
        } catch (err) {
            setError('There was an error trying to register. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="home-container">
                <h1 className="title-animate-character">Welcome to CHACK</h1>
                <div className="auth-box">
                    <h2 className="auth-title">Register</h2>
                    {error && <p className="auth-error-message">{error}</p>}
                    {successMessage && <p className="auth-success-message">{successMessage}</p>}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            value={formState.name}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={formState.username}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="profilePicture">Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            accept='image/png, image/jpeg, image/jpg'
                            onChange={handleFileChange}
                        />
                        <div className="auth-buttons">
                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>
                    <div className="auth-links">
                        <p>Already have an account? <Link to="/">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
