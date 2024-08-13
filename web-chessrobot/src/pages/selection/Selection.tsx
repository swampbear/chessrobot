import './Selection.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from '../../contextproviders/socket/SocketContext';

const Selection = () => {
    const navigate = useNavigate();
    const { socket } = useSocket();
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
    const [isRandom, setIsRandom] = useState<boolean>(false);

    const handleNextPage = async () => {
        if (socket?.connected && selectedDifficulty && selectedPiece) {
            let conditions = { difficulty: selectedDifficulty, pieceColor: selectedPiece } 
            socket.emit('json', { conditions });
            console.log(conditions)
            navigate('/boardconfig');
        } else if (!socket?.connected) {
            toast.error('You have disconnected from the robot, have you tried turning it off and on again');
        } else {
            toast.info("Please select both difficulty and pieces");
        }
    };

    const handleRandomPiece = () => {
        const pieces = ['white', 'black'];
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        setSelectedPiece(randomPiece);
        setIsRandom(true);
    };

    const handlePieceSelection = (piece: string) => {
        setSelectedPiece(piece);
        setIsRandom(false);
    };

    return (
        <div id="header-container" className="gradientBackground">
            {/* <Header /> */}
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
                            className={`pieces-button ${selectedPiece === 'white' && !isRandom ? 'white selected' : ''}`}
                            onClick={() => handlePieceSelection('white')}
                        >
                            WHITE
                        </button>
                        <button
                            className={`pieces-button ${selectedPiece === 'black' && !isRandom ? 'black selected' : ''}`}
                            onClick={() => handlePieceSelection('black')}
                        >
                            BLACK
                        </button>
                        <button
                            className={`pieces-button ${isRandom ? 'random selected' : ''}`}
                            onClick={handleRandomPiece}
                        >
                            RANDOM
                        </button>
                    </section>
                </div>
                    <button className="next-button" onClick={handleNextPage}>NEXT</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Selection;