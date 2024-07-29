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
import MoveHistory from "../../components/moveshistory/MoveHistory";

/**
 * 
 * @returns Game page as JSX Element
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
    
    const [dgtBoardFEN, setDgtBoardFEN] = useState<string>("1k1N2r1/pQpn2qp/Bp1bbp2/8/8/6B1/PPP2PPP/R5K1");
    const [movesPGN, setMovesPGN] = useState<string>("11. e4 e5 2. Nf3 Nc6 3. Bb5 3. a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2")
    const [playerMove, setPlayerMove] = useState<JSON>();
    const [robotMove, setRobotMove] = useState<JSON>();
    
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
        if (playerMove && isPlayerTurn) { //PlayerMove.isLegal && isPlayerTurn
            console.log(isShowingHistoryMove)
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
                    <ErrorBoundary fallback="Error loading the chessboard">
                        <Chessboard key={isShowingHistoryMove ? `history-${historyIndexFEN}` : `current-${dgtBoardFEN}`} dgtBoardFEN={isShowingHistoryMove ? historyIndexFEN : dgtBoardFEN} />                    
                    </ErrorBoundary>
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
                        <button className="resign-button" disabled={!isPlayerTurn}>RESIGN</button>

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