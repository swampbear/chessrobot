import React, {useEffect, useState } from 'react';
import './Chessboard.css';
import { drawPieces, drawCoordinateAxis, getFENFromPosition, createBoard} from './utils';
import { Piece } from './Piece'
import { usePieceColor } from '../../contextproviders/pieceColor/PieceColorContext';


let horizontal = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
let vertical = [8,7,6,5,4,3,2,1];




const initialBoardState: Piece[] = [];

for(let p = 0; p<2; p++){
    const type = p === 0 ? 'd' : 'l';
    const y = p === 0 ? 7 : 0;
    
    
    initialBoardState.push({image: `./assets/images/Chess_r${type}t60.png`, x: 0, y})
    initialBoardState.push({image: `./assets/images/Chess_n${type}t60.png`, x: 1, y})
    initialBoardState.push({image: `./assets/images/Chess_b${type}t60.png`, x: 2, y})
    initialBoardState.push({image: `./assets/images/Chess_q${type}t60.png`, x: 3, y})
    initialBoardState.push({image: `./assets/images/Chess_k${type}t60.png`, x: 4, y})
    initialBoardState.push({image: `./assets/images/Chess_b${type}t60.png`, x: 5, y})
    initialBoardState.push({image: `./assets/images/Chess_n${type}t60.png`, x: 6, y})
    initialBoardState.push({image: `./assets/images/Chess_r${type}t60.png`, x: 7, y})
    
for(let i =0 ; i<8 ; i++){
    initialBoardState.push({image: `./assets/images/Chess_p${type}t60.png`, x: i, y: p === 0 ? 6 : 1})
    }
} 

    //type to define props for the Chessboard component
type ChessboardProps = {
    dgtBoardFEN: string
};

/**
* The chessboard component is a conponent that has responisbility for displaying boardposistions from FEN strings. 
* @param dgtBoardFEN <- string
* @context pieceColor is needed to know which orientation the board should be rendered
* @returns Chessboard component
*/
       
const Chessboard = ({dgtBoardFEN}: ChessboardProps) => {
    const { pieceColor, setPieceColor} = usePieceColor()
    const[isPlayingWhite, setIsPlayingWhite] = useState(pieceColor === 'white')
    const[boardFen, setBoardFEN] = useState<string>(dgtBoardFEN)
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [frameHorizontal, setFrameHorizontal] = useState<JSX.Element[]>([]);
    const [frameVertical, setFrameVertical] = useState<JSX.Element[]>([]);

   
    useEffect (()=> {
        try {
            setIsPlayingWhite(pieceColor === 'white');
        } catch (error) {
            console.error('Error setting isPlayingWhite', error)
        }
        drawCoordinateAxis(isPlayingWhite, vertical, horizontal, setFrameHorizontal, setFrameVertical);
        drawPieces(isPlayingWhite, boardFen, setPieces, setBoardFEN);
    },[isPlayingWhite, dgtBoardFEN]);

    // Render the board
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