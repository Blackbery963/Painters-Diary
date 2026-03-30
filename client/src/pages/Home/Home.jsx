import React from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header';
import Hero from './Components/Hero';

function Home() {
    return (
        <div>
            <Header />
            <Sidebar />
            <Hero/>
        </div>
    )
}

export default Home;
