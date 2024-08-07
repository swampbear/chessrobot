import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../../contextproviders/socket/SocketContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"

export default function Home() {
    const {socket} = useSocket()
    const navigate = useNavigate()
    const gradientPiece = "M209.25 253.695V268.82C209.209 275.828 206.338 282.537 201.26 287.492C196.182 292.448 189.306 295.249 182.125 295.289H27.125C19.9436 295.249 13.0678 292.448 7.98969 287.492C2.91156 282.537 0.0406891 275.828 0 268.82V253.695C0.0406891 246.687 2.91156 239.978 7.98969 235.023C13.0678 230.067 19.9436 227.266 27.125 227.226H182.125C189.306 227.266 196.182 230.067 201.26 235.023C206.338 239.978 209.209 246.687 209.25 253.695ZM61.38 156.139C61.2161 173.154 56.5152 189.834 47.74 204.539H161.665C152.842 189.846 148.088 173.167 147.87 156.139C152.446 154.041 156.325 150.731 159.066 146.586C161.806 142.441 163.298 137.628 163.37 132.695V117.57C163.373 112.755 162.014 108.033 159.443 103.924C156.872 99.814 153.19 96.4761 148.8 94.2775C156.211 86.0946 161.043 75.9981 162.716 65.2007C164.39 54.4033 162.834 43.3639 158.234 33.4085C153.635 23.4532 146.188 15.005 136.789 9.07873C127.389 3.15245 116.436 0 105.245 0C94.054 0 83.1009 3.15245 73.7012 9.07873C64.3016 15.005 56.8549 23.4532 52.2556 33.4085C47.6564 43.3639 46.1001 54.4033 47.7736 65.2007C49.4472 75.9981 54.2794 86.0946 61.69 94.2775C57.1846 96.3922 53.3747 99.6939 50.6906 103.81C48.0065 107.926 46.555 112.692 46.5 117.57V132.695C46.5154 137.563 47.9144 142.332 50.5414 146.471C53.1683 150.61 56.9203 153.956 61.38 156.139Z"

    const navigateToSelectionPage = () => {
        if(socket?.connected){
            navigate('/selection')
        } else {
            toast.error("Unnable to connect to robot, have you tried turning it on and off again?")
    }};

    return (
       <motion.div id="home" className='gradientBackground'
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       exit={{opacity: 0}}
       >
            <Header/>
            <ToastContainer/>
            <div id="home-container">
                <div className="hero-section">
                    <div className="hero-text">
                        <h1>The HVL Robotics <br/>Chess Robot</h1>
                        <p>Challenge the HVL Robotics chess robot. Developed by students, funded by teknoløftet</p>
                        <div className="buttons">
                            <button className="connect-button" onClick={navigateToSelectionPage}>PLAY CHESS</button>
                            {/* <button className="github-button">Learn More</button> */}
                        </div>
                    </div>
                    <div className="hero-image">
                        {/* <img src="./assets/images/image.webp" alt="" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="420" height="692" viewBox="0 0 210 296" fill="none">
                        <path d={gradientPiece}  fill="url(#paint0_linear_4_85)"/>
                            <defs>
                                <linearGradient id="paint0_linear_4_85" x1="0.929997" y1="280.618" x2="203.238" y2="73.1385" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4285F4"/>
                                <stop offset="0.795" stop-color="#EA4335"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                
                <hr className="rounded"/>

                <div className="learn-more">
                    <h2>Learn More About The Project</h2>
                    <p>
                        Fill inn information, add sections as suited
                    </p>
                    </div>
            </div>
        </motion.div>
      

    );
};

