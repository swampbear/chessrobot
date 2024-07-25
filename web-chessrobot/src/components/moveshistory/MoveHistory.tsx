import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Chess } from 'chess.js';
import './MoveHistory.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardArrowRight,MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type MoveHistoryProps = {
    pgn: string;
    setHistoryIndexFEN: Dispatch<SetStateAction<string>>;
};

const MoveHistory: React.FC<MoveHistoryProps> = ({ pgn, setHistoryIndexFEN}) => {
    const [currentDgtPGN, setCurrentDgtPGN] = useState<string>("");
    const [moves, setMoves] = useState<string[]>([]);
    const [fens, setFens] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(1);

    const parsePgnToMovesAndFens = (pgn: string) => {
        const chess = new Chess();
        chess.loadPgn(pgn);
        setCurrentDgtPGN(chess.fen())
        const moves = chess.history({ verbose: true });
        const fens = moves.map((move, index) => {
            chess.undo()
            return chess.fen();
        });
        fens.reverse();
        moves.forEach(move => chess.move(move));
        setMoves(moves.map(move => move.san));
        setFens(fens);
        setCurrentMoveIndex(moves.length);
        setHistoryIndexFEN(chess.fen());
    };

    useEffect(() => {
        parsePgnToMovesAndFens(pgn);
    }, [pgn]);

    useEffect(() => {
        if (fens && fens.length > 0) {
            setHistoryIndexFEN(fens[currentMoveIndex]);
        }
    }, [currentMoveIndex, fens]);

    const handleRewind = () => {
        if (currentMoveIndex > 0) {
            const newIndex = currentMoveIndex - 1;
            setCurrentMoveIndex(newIndex);
            setHistoryIndexFEN(fens[newIndex]);
        }
    };
    const handleFastRewind = () => {
        if (currentMoveIndex > 0) {
            const newIndex = 0
            setCurrentMoveIndex(0)
            setHistoryIndexFEN(fens[newIndex]);
        }
    }

    const handleForward = () => {
        if (currentMoveIndex < moves.length-1) {
            const newIndex = currentMoveIndex + 1;
            setCurrentMoveIndex(newIndex);
            setHistoryIndexFEN(fens[newIndex]);
            }
        else{
            setCurrentMoveIndex(prev => prev + 1);
            setHistoryIndexFEN(currentDgtPGN)
        }
    };

    const handleFastForward = () => {
        setCurrentMoveIndex(moves.length);
        setHistoryIndexFEN(currentDgtPGN)
    }

    return (
        <>
        <div className="move-history-container">
            <h2>Move History</h2>
            <pre className="pgn-display">
                    {moves.map((move, index) => (
                        <span key={index} >
                            {index % 2 === 0 ? `${index / 2 + 1}. ` : ''}
                            <span className={currentMoveIndex - 1 === index ? 'current-move' : ''}>
                                {move + ' '}
                            </span>
                        </span>
                    ))}
                </pre>
        </div>
            <div className="controls">
                <button onClick={handleFastRewind} disabled={currentMoveIndex === 0}> <MdOutlineKeyboardDoubleArrowLeft className='icon'/></button>
                <button onClick={handleRewind} disabled={currentMoveIndex === 0}><MdKeyboardArrowLeft className='icon'/></button>
                <button onClick={handleForward} disabled={currentMoveIndex === moves.length}><MdKeyboardArrowRight className='icon'/></button>
                <button onClick={handleFastForward} disabled={currentMoveIndex === moves.length}> <MdOutlineKeyboardDoubleArrowRight className='icon'/></button>

            </div>
        </>
    );
};

export default MoveHistory;