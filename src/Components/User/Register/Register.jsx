import React, { useState } from 'react';
import useForm from '../../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import '../User.css';

const RegisterScreen = () => {
    const navigate = useNavigate();
    const { formState, handleChangeInput } = useForm({ username: '', email: '', password: '', name: '', profilePicture: null });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formState.profilePicture = file; // Guardamos el archivo en el estado
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formState.username || !formState.email || !formState.password || !formState.name || !formState.profilePicture) {
            setError('Todos los campos son obligatorios, incluyendo la foto de perfil.');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('username', formState.username);
        formData.append('email', formState.email);
        formData.append('password', formState.password);
        formData.append('name', formState.name);
        formData.append('profilePicture', formState.profilePicture);

        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Error al registrar el usuario.');
            }
        } catch (err) {
            setError('Hubo un error al intentar registrarte. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="home-container">
                <h1 className="title-animate-character">Welcome to CHACK</h1>
                <div className="auth-box">
                    <h2 className="auth-title">Registro</h2>
                    {error && <p className="auth-error-message">{error}</p>}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nombre completo"
                            value={formState.name}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Usuario"
                            value={formState.username}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Correo electrónico"
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Contraseña"
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor="profilePicture">Foto de perfil</label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            onChange={handleFileChange}
                        />
                        <div className="auth-buttons">
                            <button type="submit" className="submit-btn" disabled={isLoading}>
                                {isLoading ? 'Cargando...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>
                    <div className="auth-links">
                        <p>¿Ya tienes cuenta? <Link to="/">Inicia sesión aquí</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default RegisterScreen;
