import React, { SetStateAction, useEffect, useState } from "react";
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { usePieceColor } from "../../contextproviders/pieceColor/PieceColorContext";
import Chessboard from "../../components/chessboard/Chessboard";
import './Game.css';
import { useSocket } from "../../contextproviders/socket/SocketContext";
import ErrorBoundary from "../../ErrorBoundary";
import { ToastContainer } from "react-toastify";
import {motion} from "framer-motion"
import MoveHistory from "../../components/moveshistory/MoveHistory";


interface Move {
    pgn: string;
    fen: string;
    isLegal: boolean;
}
/**
 * 
 * @returns JSX.Element Game page
 */
const Game = () => {
    const { pieceColor, setPieceColor } = usePieceColor();
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [historyIndexFEN, setHistorIndexFEN] = useState<string>('')
    const [statusMessage, setStatusMessage] = useState("");
    const [difficulty, setDifficulty] = useState(() => {
        const savedDifficulty = localStorage.getItem('difficulty');
        return savedDifficulty ? savedDifficulty : '';
    });

    const [isShowingHistoryMove, setIsShowingHistoryMove] = useState<boolean>(false)
    
    const [dgtBoardFEN, setDgtBoardFEN] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    const [movesPGN, setMovesPGN] = useState<string>("")
    const initialMove: Move = {
        pgn: "",
        fen: "",
        isLegal: false
    };

    const [playerMove, setPlayerMove] = useState<Move>(initialMove);
    const [robotMove, setRobotMove] = useState<Move>(initialMove);
    
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();



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
    }, [historyIndexFEN, isShowingHistoryMove]);

    useEffect(() => {
        if(playerMove.fen !== ""){
            setDgtBoardFEN(playerMove.fen);
            setMovesPGN(playerMove.pgn)
        }
    }, [playerMove]);

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
                const handlePlayerMove = (PlayerMoveJSON : Move) => {
                    setPlayerMove(PlayerMoveJSON);

                    console.log(PlayerMoveJSON)
                };
    
                const handleRobotMove = (RobotMoveJSON : Move) => {
                    setRobotMove(RobotMoveJSON);
                };
                if(socket){
                    socket.emit('playerMoveTest')
                }

                socket.on('playerMove', handlePlayerMove);
                socket.on('robotMove', handleRobotMove);
                socket.on('disconnect', () => {
                    console.log('Disconnected from server')
                })
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

    
    /**
     * Confirms the users move if the move was legal.
     * Then sets players turn to false which disables confirmation 
     * and resignbutton for user.
     * Emits message to socket that move have been confirmed.
     */
    const handleConfirmMove = async () => {
        if (playerMove.isLegal && isPlayerTurn) { 
            setIsShowingHistoryMove(false)
            setIsPlayerTurn(false);
            await new Promise(r => setTimeout(r, 3000));
            setIsPlayerTurn(true);
        }
    };

    const handleResignPress = () => {
        
    }

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
    
    const renderChessboard = () => (
                <ErrorBoundary fallback="Error loading the chessboard">
                    <Chessboard key={isShowingHistoryMove ? `history-${historyIndexFEN}` : `current-${dgtBoardFEN}`} dgtBoardFEN={isShowingHistoryMove ? historyIndexFEN : dgtBoardFEN} />
                </ErrorBoundary>

    );

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
                        {renderChessboard()}
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
                    <MoveHistory pgn={movesPGN} setHistoryIndexFEN={setHistorIndexFEN} setIsShowingHistoryMove={setIsShowingHistoryMove}/>
                    <div id="status-message">
                    <p style={{ fontSize: '2.5rem' }}>{statusMessage}</p>
                    </div>
                    <div id="buttons-container">
                        <button className="confirm-button" disabled={!isPlayerTurn} onClick={handleConfirmMove}>CONFIRM MOVE</button>
                        <button className="resign-button" disabled={!isPlayerTurn} onClick={handleResignPress}>RESIGN</button>

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