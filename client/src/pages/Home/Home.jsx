import React from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header';
import Hero from './Components/Hero';
import LandingFeed from './Components/ImageCard';
import MiniChatBar from '../Chat/MiniChatBar';

function Home() {
    return (
        <div className=' bg-gray-100 dark:bg-zinc-950 px-1'>
            <Header />
            <Sidebar />
            <Hero/>
            <LandingFeed/>
            <MiniChatBar/>
        </div>
    )
}

export default Home;
