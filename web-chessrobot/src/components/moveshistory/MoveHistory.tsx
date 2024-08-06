import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import { Chess } from 'chess.js';
import './MoveHistory.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

type MoveHistoryProps = {
    pgn: string;
    setHistoryIndexFEN: Dispatch<SetStateAction<string>>;
    setIsShowingHistoryMove: Dispatch<SetStateAction<boolean>>;
};
/**
 * Responisble for take in movehistory as pgn and setHistoryIndex and if the move history chould be displayed or not
 * @param pgn
 * @param setHistorIndexFEN
 * @param setIsShowingHistoryMove 
 * @returns MoveHistory JSX object
 */
const MoveHistory = ({ pgn, setHistoryIndexFEN, setIsShowingHistoryMove } : MoveHistoryProps ) => {
    const [currentDgtPGN, setCurrentDgtPGN] = useState<string>("");
    const [moves, setMoves] = useState<string[]>([]);
    const [fens, setFens] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(1);

    const selectedMoveRef = useRef<HTMLSpanElement | null>(null);

    const parsePgnToMovesAndFens = (pgn: string) => {
        const chess = new Chess();
        chess.loadPgn(pgn);
        setCurrentDgtPGN(chess.fen());
        const moves = chess.history({ verbose: true });
        const fens = moves.map((move, index) => {
            chess.undo();
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
        if (selectedMoveRef.current) {
            selectedMoveRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentMoveIndex, fens]);

    const handleRewind = () => {
        if (currentMoveIndex > 0) {
            setIsShowingHistoryMove(true);
            const newIndex = currentMoveIndex - 1;
            setCurrentMoveIndex(newIndex);
            setHistoryIndexFEN(fens[newIndex].split(' ')[0]);
        }
    };
    const handleFastRewind = () => {
        if (currentMoveIndex > 0) {
            setIsShowingHistoryMove(true);
            const newIndex = 0;
            setCurrentMoveIndex(newIndex);
            setHistoryIndexFEN(fens[newIndex].split(' ')[0]);
        }
    }

    const handleForward = () => {
        if (currentMoveIndex < moves.length - 1) {
            const newIndex = currentMoveIndex + 1;
            setCurrentMoveIndex(newIndex);
            setHistoryIndexFEN(fens[newIndex].split(' ')[0]);
            setIsShowingHistoryMove(true);
        } else {   
            setCurrentMoveIndex(prev => prev + 1);
            setHistoryIndexFEN(currentDgtPGN);
            setIsShowingHistoryMove(false);
        }
    };

    const handleFastForward = () => {
        setIsShowingHistoryMove(false);
        setCurrentMoveIndex(moves.length);
        setHistoryIndexFEN(currentDgtPGN);
    }

    return (
        <>
             <div className="move-history-container">
                <h2>Move History</h2>
                <pre className="pgn-display">
                    {moves.map((move, index) => {
                        if (index % 2 === 0) {
                            return (
                                <section key={index} className="move-section">
                                    <div className="move-pair">
                                        <span className="move-number">{`${index / 2 + 1}.`}</span>
                                        <span
                                            ref={currentMoveIndex - 1 === index ? selectedMoveRef : null}
                                            className={`move ${currentMoveIndex - 1 === index ? 'current-move' : ''}`}
                                        >
                                            {move}
                                        </span>
                                    </div>
                                    {index + 1 < moves.length && (
                                        <div className="move-pair-right">
                                            <span
                                                ref={currentMoveIndex - 1 === index + 1 ? selectedMoveRef : null}
                                                className={`move ${currentMoveIndex - 1 === index + 1 ? 'current-move' : ''}`}
                                            >
                                                {moves[index + 1]}
                                            </span>
                                        </div>
                                    )}
                                </section>
                            );
                        }
                        return null;
                    })}
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