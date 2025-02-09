import React, { useContext, useState, useEffect } from 'react';
import useForm from '../../../hooks/useForm';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import '../User.css';

const LoginScreen = () => {
    const { login, isAuthenticatedState } = useContext(AuthContext);
    const navigate = useNavigate();
    const { formState, handleChangeInput } = useForm({ email: '', password: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const verified = searchParams.get('verified');
        if (verified === 'true') {
            setSuccessMessage('¡Tu correo ha sido verificado exitosamente! Ahora puedes iniciar sesión.');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
    
        if (!formState.email || !formState.password) {
            setError('Complete all fields to log in.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formState.email,
                    password: formState.password,
                }),
            });
    
            const data = await response.json();
            console.log('API Response:', data);
    
            if (!response.ok) {
                throw new Error(data.message || 'Error desconocido al iniciar sesión.');
            }
    
            if (!data.data || !data.data.access_token) {
                throw new Error(data.message);
            }
    
            localStorage.setItem('token', data.data.access_token);
            navigate('/home');
    
        } catch (err) {
            setError(err.message || 'Hubo un error al intentar iniciar sesión.');
        }
    };
    
    


    return (
        <div className='auth-container'>
            <div className='home-container'>
                <h1 className="title-animate-character">Welcome to CHACK</h1>
                <div className='auth-box'>
                    <h2 className='auth-title'>Iniciar Sesión</h2>
                    {successMessage && <p className='auth-success-message'>{successMessage}</p>}
                    {error && <p className='auth-error-message'>{error}</p>}
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <label htmlFor='email'>Correo electrónico</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Correo electrónico'
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                        <label htmlFor='password'>Contraseña</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Contraseña'
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                        <div className='auth-buttons'>
                            <button type='submit' className='submit-btn'>Ingresar</button>
                        </div>
                    </form>
                    <div className='auth-links'>
                        <p>¿No tienes cuenta? <Link to='/register'>Regístrate aquí</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
