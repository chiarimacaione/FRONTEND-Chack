import React from 'react';
import HomeWS from '../Components/Workspaces/Home/HomeWS';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='home-container'>
                {/* Botón para ver el perfil del usuario */}
        <Link to="/profile">
          <button className="profile-btn">View Profile</button>
        </Link>
                <h1 className="title-animate-character">Welcome to CHACK</h1>
                <h2 className="subtitle-animate-character">Nice to see you again!</h2>
            </div>
            <HomeWS />
        </>
    );
}

export default Home;
