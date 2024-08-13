import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Chessboard from '../../components/chessboard/Chessboard';
import './BoardConfig.css';
import { useSocket } from '../../contextproviders/socket/SocketContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { usePieceColor } from '../../contextproviders/pieceColor/PieceColorContext';
import ErrorBoundary from '../../ErrorBoundary';

const BoardConfig = () => {
    const { socket } = useSocket();
    const [isBoardValid, setIsBoardValid] = useState<boolean>(true);
    const { pieceColor, setPieceColor } = usePieceColor();
    const [loading, setLoading] = useState<boolean>(true);
    const [startFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')

    const navigate = useNavigate();

    useEffect(() => {
        function fetchIsBoardValid() {
            try {
                if (socket) {
                    socket.emit('boardValidation');
                    socket.on('boardValidValue', (isValid: boolean) => {
                        if (isValid.valueOf === null) {
                            throw new Error('Valid value cannot be null');
                        }
                        setIsBoardValid(isValid);
                    });
                }
            } catch (error) {
                console.error(error);
                alert("There has been an error fetching piece color from the socket.");
            }
        }

        fetchIsBoardValid()

        return () => {
            socket?.off('boardValidation');
        };
    }, [socket]);

    useEffect(() => {
        function fetchPieceColor() {
            try {
                if (socket) {
                    socket.emit('getColor')
                    socket.on('getColor', (color: string) => {
                        if (color === '') {
                            throw new Error('Color cannot be empty');
                        }
                        console.log(color)
                        setPieceColor(color);
                        setLoading(false);
                    });
                }
            } catch (error) {
                console.error(error);
                alert("There has been an error fetching piece color from the socket.");
            }
        }
        fetchPieceColor();
        return () => {
            socket?.off('getColor');
        };
    }, [socket, pieceColor]);

    const handleStartGameClick = () => {
        try {
            if (isBoardValid && socket) {
                socket.emit('startGame');
                navigate('/game');
                toast.success("Everything is set up correctly");
            } else {
                toast.error("The board is not set up correctly. Make sure all pieces are placed in their correct positions.");
            }
        } catch (error) {
            console.error("Error in navigation operation", error);
            toast.error("There has been an error");
        }
    }

    return (
        <div id="header-container" className='gradientBackground'>
            <Header />
            <div id="boardconfig">
                <div id="chessboard-area">
                    <div id="chessboard-container">
                        {loading ? (
                            <div className="spinner">
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <ErrorBoundary fallback={<h2>Error loading board...</h2>}>
                                <Chessboard dgtBoardFEN={startFen} />
                            </ErrorBoundary>
                        )}
                    </div>
                </div>
                <div id="info-container">
                    <h2>Validate Board</h2>
                    <p>
                        You have chosen the {pieceColor} pieces. Make sure the numbers and letters are in the same orientation as on the illustration. Then place the pieces in their correct positions.
                        <br /> <br />
                        Good luck, you are probably going to LOSE.
                    </p>
                    <button id="start-game-button" onClick={handleStartGameClick}>START GAME</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BoardConfig;