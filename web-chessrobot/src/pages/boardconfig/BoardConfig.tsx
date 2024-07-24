import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import Chessboard from '../../components/chessboard/Chessboard';
import './BoardConfig.css';
import { useSocket } from '../../contextproviders/socket/SocketContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { usePieceColor } from '../../contextproviders/pieceColor/PieceColorContext';
import ErrorBoundary from '../../ErrorBoundary';
import { motion } from "framer-motion"


const BoardConfig = () => {
    const { socket } = useSocket();
    const [isValid, setIsValid] = useState<boolean>(false);
    const { pieceColor, setPieceColor } = usePieceColor();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    

    useEffect(() => {
        function fetchPieceColor() {
            try {
                if(socket){
                socket.emit('getColor');
                socket.on('getColor', (color: string) => {
                    if(color === ''){
                        throw new Error('Color cannot be empty')
                    }
                    setPieceColor(color);
                    setLoading(false);
                });}
            } catch (error) {
                console.error(error);
                alert("There has been an error fetching pieceColor from python socket")
            }
            
        }
        try {
            fetchPieceColor();
            return () => {
                socket?.off('getColor');
            };
        } catch (error) {
            console.error(error)
        }
    }, [socket]);


    function handleStartGameClick(){
        try {
            if(isValid){
                //TODO implemnt routing to game page
                navigate('/game');

                toast.success("Everything is set up correctly")
            } else{
                toast.error("The board is not set up correctly. Make sure that all peices are placed in ther correct place, at the correct row and column.")
            }
        } catch (error) {
            console.error("Error in navigation operation", error);
            toast.error("There has been an error");
        }
       
    }

    return (
        <motion.div id="header-container" className="gradientBackground"
        initial={{opacity: 0}}
       animate={{opacity: 1}}
       exit={{opacity: 0}}
        >
            <Header />
            <div id="boardconfig">
                <div id="chessboard-area">
                    <div id="robot-label">(ROBOT)</div>
                    <div id="chessboard-container">
                        {loading ? (
                            <div className="spinner">
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <ErrorBoundary fallback={<h2>Error loading board...</h2>}>
                                <Chessboard setIsValid={setIsValid} />
                            </ErrorBoundary>
                        )}
                    </div>
                    <div id="you-label">(YOU)</div>
                </div>
                <div id="info-container">
                    <h2>Validate board</h2>
                    <p>
                        You have chosen the {pieceColor} pieces. Make sure the numbers and letters are in the same orientation as on the illustration. Then place the pieces in their correct position. 
                        <br /> <br />
                        Good luck, you are probably going to LOSE.
                    </p>
                    <button id="start-game-button" onClick={handleStartGameClick}>START GAME</button>
                </div>
            </div>
            <ToastContainer />
        </motion.div>
    );
};


export default BoardConfig;