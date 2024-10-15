import React from 'react';
import HomeWS from '../Components/Workspaces/Home/HomeWS';
import './Home.css';

const Home = () => {
    return (
        <>
            <div className='home-container'>
                <h1 className="title-animate-character">Welcome to CHACK</h1>
                <h2 className="subtitle-animate-character">Nice to see you again!</h2>
            </div>
            <HomeWS />
        </>
    );
}

export default Home;
