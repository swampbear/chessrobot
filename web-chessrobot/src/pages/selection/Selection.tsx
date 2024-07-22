import './Selection.css';
import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { useSocket } from '../../contextproviders/socket/SocketContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"



const Selection = () => {
    const navigate = useNavigate()
    const { socket } = useSocket();
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

    const handleNextPage = async () => {
        if (socket?.connected && selectedDifficulty && selectedPiece){
            socket.emit('json', {Conditions: {difficulty: selectedDifficulty, pieceColor: selectedPiece}})
            await new Promise(r => setTimeout(r, 500));
            navigate('/boardconfig');
        } else if(!socket?.connected){
            toast.error('You have diconnected from the robot, hae you tried turning it off and on again');
        } 
        else {
            toast.info("Please select both difficulty and pieces");
        }
    };

    return (
        <motion.div id="header-container" className="gradientBackground"
        initial={{opacity: 0}}
       animate={{opacity: 1}}
       exit={{opacity: 0}}
        >
            <Header />
        <div id="selection" className="gradientBackground">
            <div className="container">
                <section id="difficulty-container">
                    <h2 className="title">Choose Difficulty</h2>
                    <button
                        className={`difficulty-button ${selectedDifficulty === 'easy' ? 'easy selected' : ''}`}
                        onClick={() => setSelectedDifficulty('easy')}
                    >
                        EASY
                    </button>
                    <button
                        className={`difficulty-button ${selectedDifficulty === 'medium' ? 'medium selected' : ''}`}
                        onClick={() => setSelectedDifficulty('medium')}
                    >
                        MEDIUM
                    </button>
                    <button
                        className={`difficulty-button ${selectedDifficulty === 'hard' ? 'hard selected' : ''}`}
                        onClick={() => setSelectedDifficulty('hard')}
                    >
                        HARD
                    </button>
                </section>
                <section id="pieces-container">
                    <h2 className="title">Choose Your Pieces</h2>
                    <button
                        className={`pieces-button ${selectedPiece === 'white' ? 'white selected' : ''}`}
                        onClick={() => setSelectedPiece('white')}
                    >
                        WHITE
                    </button>
                    <button
                        className={`pieces-button ${selectedPiece === 'black' ? 'black selected' : ''}`}
                        onClick={() => setSelectedPiece('black')}
                    >
                        BLACK
                    </button>
                </section>
                <section id="beforegame-container">
                    <h2 className="title">Before Starting The Game</h2>
                    {/* <ul className="instructions-list">
                        <li>Make sure all the pieces are in their correct position</li>
                        <li>You will be able to see if it is your turn or the robot's turn on the screen</li>
                        <li>Be aware when it is the robot's turn to move, it is quite strong</li>
                    </ul> */}
                    <button className="next-button" onClick={handleNextPage}>NEXT</button>
                </section>
            </div>
        </div>
        <ToastContainer />

        </motion.div>
    );
};
export default Selection;