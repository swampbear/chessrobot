import React, { useEffect, useState } from "react";
import Header from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { usePieceColor } from "../../contextproviders/pieceColor/PieceColorContext";
import Chessboard from "../../components/chessboard/Chessboard";
import './Game.css';
import { useSocket } from "../../contextproviders/socket/SocketContext";
import ErrorBoundary from "../../ErrorBoundary";
import { ToastContainer } from "react-toastify";
import MoveHistory from "../../components/moveshistory/MoveHistory";
import PieceGraveyard from "../../components/piecegraveyard/PieceGraveyard";
import StatusMessage from "../../components/statusmessage/StatusMessage";
import ResignModal from "../../components/resignmodal/ResignModal";
import { useNavigate } from "react-router-dom";

/**
 * Interface for a move
 * @interface Move
 */
interface Move {
    pgn: string;
    fen: string;
    isLegal: boolean;
}

/**
 * 
 * @returns Game page for chess game
 */
const Game = () => {
    const { pieceColor, setPieceColor } = usePieceColor();
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [historyIndexFEN, setHistorIndexFEN] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState("");
    const [difficulty, setDifficulty] = useState(() => {
        const savedDifficulty = localStorage.getItem('difficulty');
        return savedDifficulty ? savedDifficulty : '';
    });
    const [isShowingHistoryMove, setIsShowingHistoryMove] = useState<boolean>(false);
    const [dgtBoardFEN, setDgtBoardFEN] = useState<string>("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    const [movesPGN, setMovesPGN] = useState<string>("");
    const initialMove: Move = {
        pgn: "",
        fen: "",
        isLegal: false
    };
    const [playerMove, setPlayerMove] = useState<Move>(initialMove);
    const [robotMove, setRobotMove] = useState<Move>(initialMove);
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const savedPieceColor = localStorage.getItem('pieceColor');
        if (savedPieceColor) {
            setPieceColor(savedPieceColor);
            setIsPlayerTurn(savedPieceColor === 'white');
        }
        setLoading(false);
    }, [pieceColor, setPieceColor]);

    useEffect(() => {}, [historyIndexFEN, isShowingHistoryMove]);

    useEffect(() => {
        if (playerMove.fen !== "") {
            setDgtBoardFEN(playerMove.fen);
            setMovesPGN(playerMove.pgn);
        }
    }, [playerMove]);

    useEffect(() => {
        if (isPlayerTurn) {
            setStatusMessage("Your move! Move a piece and confirm you move");
        } else {
            setStatusMessage("Robot's move! Keep your hand off the board, or it will get very angry.");
        }
    }, [isPlayerTurn]);

    useEffect(() => {
        try {
            if (socket) {
                socket.emit('getDifficulty');
                socket.on('getDifficulty', (difficulty) => {
                    const capitalizedDifficulty = capitalizeFirstLetter(difficulty);
                    setDifficulty(capitalizedDifficulty);
                    localStorage.setItem('difficulty', capitalizedDifficulty);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [socket]);

    /**
     * UpdatesPGN when recieved from 
     */
    useEffect(() => {
        try {
            if (socket) {
                socket.on('updatePGN', (PGN) => {
                    setMovesPGN(PGN);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [socket]);

    useEffect(() => {
        try {
            if (socket) {
                const handlePlayerMove = (PlayerMoveJSON: Move) => {
                    setPlayerMove(PlayerMoveJSON);
                    console.log(PlayerMoveJSON);
                };

                const handleRobotMove = (RobotMoveJSON: Move) => {
                    setRobotMove(RobotMoveJSON);
                };
                socket.emit('playerMoveTest');

                socket.on('playerMove', handlePlayerMove);
                socket.on('robotMove', handleRobotMove);
                socket.on('disconnect', () => {
                    console.log('Disconnected from server');
                });
                return () => {
                    socket.off('playerMove', handlePlayerMove);
                    socket.off('robotMove', handleRobotMove);
                };
            }
        } catch (error) {
            console.error(error);
        }
    }, [socket]);

    useEffect(() => {
        if (pieceColor) {
            localStorage.setItem('pieceColor', pieceColor);
        }
    }, [pieceColor]);

    const handleConfirmMove = async () => {
        if (playerMove.isLegal && isPlayerTurn) {
            socket?.emit('confirmMove');
            setIsShowingHistoryMove(false);
            setIsPlayerTurn(false);
            await new Promise(r => setTimeout(r, 3000));
            setIsPlayerTurn(true);
        }
    };

    const showModal = () =>{
        setModalVisible(true)
    }

    const handleResignPress = () => {
        if(socket) {
            socket.emit('resign')
            navigate('/end')
            //TODO create end
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

    const renderChessboard = () => (
        <ErrorBoundary fallback="Error loading the chessboard">
            <Chessboard key={isShowingHistoryMove ? `history-${historyIndexFEN}` : `current-${dgtBoardFEN}`} dgtBoardFEN={isShowingHistoryMove ? historyIndexFEN : dgtBoardFEN} />
        </ErrorBoundary>
    );

    return (
        <div id="header-container" className="gradientBackground"
        >
            {modalVisible && <ResignModal onResign={handleResignPress} onCancel={() => setModalVisible(false)}/>}
                
                <Header />
            <div id="content-container">
                <div id="left-panel">
                    <div id="opponent-info">
                        <div id="opponent-avatar" className="avatar">
                            <img src="./assets/images/robotics_logo.jpg" alt="Opponent Avatar" />
                        </div>
                        <div className="opponent-details">
                            <h2 key={difficulty}>CHESS ROBOT {difficulty}</h2>
                            <PieceGraveyard key={dgtBoardFEN} pieceColor={pieceColor === 'white' ? 'white' : 'black'} fen={isShowingHistoryMove ? historyIndexFEN : dgtBoardFEN} />
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
                            <PieceGraveyard key={dgtBoardFEN} pieceColor={pieceColor === 'white' ? 'black' : 'white'} fen={isShowingHistoryMove ? historyIndexFEN : dgtBoardFEN} />
                        </div>
                    </div>
                </div>
                <div id="right-panel">
                    <MoveHistory pgn={movesPGN} setHistoryIndexFEN={setHistorIndexFEN} setIsShowingHistoryMove={setIsShowingHistoryMove} />
                    <StatusMessage message={statusMessage} />
                    <div id="buttons-container">
                        <button className="confirm-button" disabled={!isPlayerTurn} onClick={handleConfirmMove}>CONFIRM MOVE</button>
                        <button className="resign-button" disabled={!isPlayerTurn} onClick={showModal}>RESIGN</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );

    function capitalizeFirstLetter(str: string): string {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export default Game;