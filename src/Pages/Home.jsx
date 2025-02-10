import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import HomeWS from '../Components/Workspaces/Home/HomeWS';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#611f69",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token"); // Elimina el token de autenticación
                navigate("/"); // Redirige a la página de inicio de sesión
            }
        });
    };

    return (
        <>
            <div className='home-container'>
                <div className="profile-buttons">
                    <Link to="/profile">
                        <button className="profile-btn">View Profile</button>
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                <h1 className="title-animate-character">Welcome to CHACK</h1>
                <h2 className="subtitle-animate-character">Nice to see you again!</h2>
            </div>
            <HomeWS />
        </>
    );
}

export default Home;