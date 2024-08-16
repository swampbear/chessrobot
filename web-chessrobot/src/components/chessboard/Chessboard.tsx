import React, {useEffect, useState } from 'react';
import './Chessboard.css';
import { drawPieces, drawCoordinateAxis, getFENFromPosition, createBoard} from './utils';
import { Piece } from './Piece'
import { usePieceColor } from '../../contextproviders/pieceColor/PieceColorContext';

/**
 * Defines props that will be passed to the chessboard component
 */
type ChessboardProps = {
    dgtBoardFEN: string
};


/**
* The chessboard component is a conponent that has responisbility for displaying boardposistions from FEN strings. 
* @param dgtBoardFEN <- string
* @context pieceColor is needed to know which orientation the board should be rendered
* @returns JSX.ELEMENT chessboard component
*/       

const Chessboard = ({ dgtBoardFEN }: ChessboardProps) => {
    const { pieceColor } = usePieceColor();
    const [isPlayingWhite, setIsPlayingWhite] = useState(pieceColor === 'white');
    const [boardFen, setBoardFEN] = useState<string>(dgtBoardFEN);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [previousPieces, setPreviousPieces] = useState<{ [key: string]: string }>({});
    const [frameHorizontal, setFrameHorizontal] = useState<JSX.Element[]>([]);
    const [frameVertical, setFrameVertical] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setIsPlayingWhite(pieceColor === 'white');
        drawCoordinateAxis(isPlayingWhite, setFrameHorizontal, setFrameVertical);
    }, [isPlayingWhite, dgtBoardFEN]);

    useEffect(() => {
    console.log('FEN changed:', dgtBoardFEN);
    drawPieces(isPlayingWhite, dgtBoardFEN, setPieces, setBoardFEN);
}, [dgtBoardFEN, isPlayingWhite]);

    useEffect(() => {
        const pieceMap: { [key: string]: string } = {};
        pieces.forEach((p) => {
            pieceMap[`${p.x},${p.y}`] = p.image;
        });

        setPreviousPieces(pieceMap);
    }, [pieces]);

    

    return (
        <div id='container'>
            <div id="frame">
                <section id="vertical-numbers">
                    {frameVertical}
                </section>
                <div id="chessboard">
                    {createBoard(pieces, previousPieces)}
                </div>
                <section id="horizontal-letters">
                    {frameHorizontal}
                </section>
            </div>
        </div>
    );
};

export default Chessboard;