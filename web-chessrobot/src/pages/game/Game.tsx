import React, { useEffect, useState } from "react";
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { usePieceColor } from "../../contextproviders/pieceColor/PieceColorContext";
import Chessboard from "../../components/chessboard/Chessboard";
import './Game.css';
import { useSocket } from "../../contextproviders/socket/SocketContext";
import ErrorBoundary from "../../ErrorBoundary";
import { ToastContainer } from "react-toastify";
import {motion} from "framer-motion"

const Game = () => {
    const { pieceColor, setPieceColor } = usePieceColor();
    const [isValid, setIsValid] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(pieceColor === 'white');
    const [statusMessage, setStatusMessage] = useState("");
    const [difficulty, setDifficulty] = useState(() => {
        const savedDifficulty = localStorage.getItem('difficulty');
        return savedDifficulty ? savedDifficulty : '';
    });
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();

    const [playerMove, setPlayerMove] = useState<JSON>();
    const [robotMove, setRobotMove] = useState<JSON>();

    let moves = "1.d4 Nc6 2. e4 e6 3. Nf3 Nf6 4. Bd3 d5 5. e5 Nd7 6. O-O b6 7. Bg5 f6 8. exf6 gxf6 9. Bh4 Qe7 10. Re1 Bb7 11. Nc3 O-O-O 12. Nxd5 Qg7 13. Rxe6 Nxd4 14. Nxd4 Bxd5 15. Bf1 Rg8 16. Bg3 Bxe6 17. Ba6+ Kb8 18. Nc6+ Ka8 19. Nxd8 Bd6 20. Qf3+ Kb8 21. Qb7# 1-0"



    //<============ UseEffect HELL =============>
    useEffect(() => {
        const savedPieceColor = localStorage.getItem('pieceColor');
        if (savedPieceColor) {
            setPieceColor(savedPieceColor);
            setIsPlayerTurn(savedPieceColor === 'white');
        }
        setLoading(false);
    }, [pieceColor]);

    useEffect(() => {
        if (isPlayerTurn) {
            setStatusMessage("Your move!");
        } else {
            setStatusMessage("Robot's move! Keep your hand off the board, or it will get very angry.");
        }
    }, [isPlayerTurn]);

    //useEffect for getting the difficulty
    useEffect(() => {
        try {
            if(socket){
            socket.emit('getDifficulty');
            socket.on('getDifficulty', (difficulty) => {
                const capitalizedDifficulty = capitalizeFirstLetter(difficulty);
                setDifficulty(capitalizedDifficulty);
                localStorage.setItem('difficulty', capitalizedDifficulty);
            });}
        } catch (error) {
            console.log(error);
        }
    }, [socket]);

    //useEffect for getting the moves done on the board
    useEffect(() => {
        try {
            if (socket) {
                const handlePlayerMove = (PlayerMoveJSON : JSON) => {
                    setPlayerMove(PlayerMoveJSON);
                };
    
                const handleRobotMove = (RobotMoveJSON : JSON) => {
                    setRobotMove(RobotMoveJSON);
                };
    
                socket.on('playerMove', handlePlayerMove);
                socket.on('robotMove', handleRobotMove);
                
                return () => {
                    socket.off('playerMove', handlePlayerMove);
                    socket.off('robotMove', handleRobotMove);
                };
            }
        }
        catch (error) {
            
        }
    },[socket])

    useEffect(() => {
        if (pieceColor) {
            localStorage.setItem('pieceColor', pieceColor);
        }
    }, [pieceColor]);
    //<===========================================>

    

    const handleConfirmMove = async () => {
        if (isValid) {
            setIsPlayerTurn(false);
            await new Promise(r => setTimeout(r, 3000));
            setIsPlayerTurn(true);
        }
    };

    if (loading) {
        return (
            <div id="header-container" className="gradientBackground">
                <Header />
                <div id="content-container">
                    <p>Loading...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <motion.div id="header-container" className="gradientBackground"
        initial={{opacity: 0}}
       animate={{opacity: 1}}
       exit={{opacity: 0}}
        >
            <Header />
            <div id="content-container">
                <div id="left-panel">
                    <div id="opponent-info">
                        <div id="opponent-avatar" className="avatar">
                            <img src="./assets/images/robotics_logo.jpg" alt="Opponent Avatar" />
                        </div>
                        <div className="opponent-details">
                            <h2>CHESS ROBOT</h2>
                            <p style={{ fontSize: '1rem' }}>{difficulty} difficulty</p>
                        </div>
                    </div>
                    <div id="chessboard-container">
                        {loading ? (
                            <div className="spinner">
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <ErrorBoundary fallback="Error loading the chessboard">
                                <Chessboard setIsValid={setIsValid} />
                            </ErrorBoundary>
                        )}
                    </div>
                    <div id="player-info">
                        <div id="player-avatar" className="avatar">
                            <img src="./assets/images/player_avatar.webp" alt="Player Avatar" />
                        </div>
                        <div className="player-details">
                            <h2>YOU</h2>
                            <p>Mortal</p>
                        </div>
                    </div>
                </div>
                <div id="right-panel">
                    <div id="moves-played">
                        <h2>Moves</h2>
                        <p style={{ fontSize: '1.5rem' }}>{moves}</p>                    
                    </div>
                    <div id="status-message">
                    <p style={{ fontSize: '2.5rem' }}>{statusMessage}</p>
                    </div>
                    <div id="buttons-container">
                        <button className="resign-button">RESIGN</button>
                        <button className="confirm-button" onClick={handleConfirmMove}>CONFIRM MOVE</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </motion.div>
    );
    function capitalizeFirstLetter(str: string): string {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export default Game;