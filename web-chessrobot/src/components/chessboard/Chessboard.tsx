import React, {useEffect, useState } from 'react';
import './Chessboard.css';
import { drawPieces, drawCoordinateAxis, getFENFromPosition, createBoard} from './utils';
import { Piece } from './Piece'
import { usePieceColor } from '../../contextproviders/pieceColor/PieceColorContext';


let horizontal = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
let vertical = [8,7,6,5,4,3,2,1];

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
       
const Chessboard = ({dgtBoardFEN}: ChessboardProps) => {
    const { pieceColor, setPieceColor} = usePieceColor()
    const[isPlayingWhite, setIsPlayingWhite] = useState(pieceColor === 'white')
    const[boardFen, setBoardFEN] = useState<string>(dgtBoardFEN)
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [frameHorizontal, setFrameHorizontal] = useState<JSX.Element[]>([]);
    const [frameVertical, setFrameVertical] = useState<JSX.Element[]>([]);

   
    useEffect (()=> {
        try {
            setIsPlayingWhite(pieceColor === 'white');
        } catch (error) {
            console.error('Error setting isPlayingWhite', error)
        }
        drawPieces(isPlayingWhite, boardFen, setPieces, setBoardFEN);
        drawCoordinateAxis(isPlayingWhite, vertical, horizontal, setFrameHorizontal, setFrameVertical);
    },[isPlayingWhite, dgtBoardFEN]);

    useEffect (()=> {
       
    },[]);

    return (
        <div id='container'>
            <div id="frame">
                <section id="vertical-numbers">
                    {frameVertical}
                </section>
                <div id="chessboard">   
                    {createBoard(pieces, vertical, horizontal)}
                </div>   
                <section id="horizontal-letters">
                    {frameHorizontal}
                </section>
            </div>
         </div>
    )
}

export default Chessboard;