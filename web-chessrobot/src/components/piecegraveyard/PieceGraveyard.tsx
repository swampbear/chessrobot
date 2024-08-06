import React, { useEffect, useState } from 'react';
import './PieceGraveyard.css';
import { useNavigate } from 'react-router-dom';

type PieceGraveyardProps = {
    fen: string;
    pieceColor: string;
};

/**
 * This component returns a JSX.Element containg a section that organizes images of what pieces that have been captured
 * and how many of them have been captured
 * 
 * To use the component you need to give it a fen string representing a postion on a chessboard.
 * You also need to give what color you want the pieces to have when rendered
 * 
 * Traditionally this will be white pieces for someone playing plack and vise versa to show what pieces
 * the player have taken from the opponent
 * 
 * The pieces are styled to stack opon same piecetypes horizontaly and add a margin to the next piecetype behind it
 * 
 * @param fen
 * @param pieceColor 
 * @returns JSX.Element representing captured pieces in of given color
 */
const PieceGraveyard = ({ fen, pieceColor }: PieceGraveyardProps) => {
    const [pieces, setPieces] = useState<JSX.Element[]>([]);

    useEffect(() => {
        let pieceChars = ['p', 'r', 'n', 'b', 'q'];
        let fenChars = fen.split('');
        if (pieceColor === 'white') {
            pieceChars = pieceChars.map(p => p.toUpperCase());
        }

        /**
         * returns how many of a certain piece that are missing from the chessboard
         * @param total 
         * @param fenChars 
         * @param pieceChar 
         * @returns number: number missing piece of selected piecetype
         */
        const calculateMissingPieces = (total: number, fenChars: string[], pieceChar: string) =>
            total - fenChars.filter(p => p === pieceChar).length;

        const pawns = calculateMissingPieces(8, fenChars, pieceChars[0]);
        const rooks = calculateMissingPieces(2, fenChars, pieceChars[1]);
        const knights = calculateMissingPieces(2, fenChars, pieceChars[2]);
        const bishops = calculateMissingPieces(2, fenChars, pieceChars[3]);
        const queen = calculateMissingPieces(1, fenChars, pieceChars[4]);

        const allPieces: JSX.Element[] = [];
        let currentX = 0;
        
        if (pawns > 0) {
            allPieces.push(renderCapturedPieces(pawns, 'p', currentX));
            currentX += pawns * 20 + 30; // Move to the next column
        }
        
        if (rooks > 0) {
            allPieces.push(renderCapturedPieces(rooks, 'r', currentX));
            currentX += rooks * 20 + 30; // Move to the next column
        }
        
        if (knights > 0) {
            allPieces.push(renderCapturedPieces(knights, 'n', currentX));
            currentX += knights * 20 + 30; // Move to the next column
        }
        
        if (bishops > 0) {
            allPieces.push(renderCapturedPieces(bishops, 'b', currentX));
            currentX += bishops * 20 + 30; // Move to the next column
        }
        
        if (queen > 0) {
            allPieces.push(renderCapturedPieces(queen, 'q', currentX));
        }

        setPieces(allPieces);

    }, [fen, pieceColor]);

    /**
     * returns a array of images captured pieces based on how many is missing, what type of piece that is missing and an offset
     * that secures that the elements does not render on top of eachother
     * @param count 
     * @param pieceType 
     * @param offsetX 
     * @returns images of captured piece of given time with given idex gap behind
     */
    const renderCapturedPieces = (count: number, pieceType: string, offsetX: number): JSX.Element => {
        const images: JSX.Element[] = [];
        const colorPrefix = pieceColor === 'white' ? 'l' : 'd'; // 'l' for light (white), 'd' for dark (black)

        for (let i = 0; i < count; i++) {
            const pieceNameMap: { [key: string]: string } = {
                'p': 'pawn',
                'r': 'rook',
                'n': 'knight',
                'b': 'bishop',
                'q': 'queen'
            };
            const pieceName = pieceNameMap[pieceType.toLowerCase()];
            const imageName = `Chess_${pieceType}${colorPrefix}t60.png`;

            images.push(
                <img
                    key={`${pieceType}-${i}`}
                    src={`./assets/images/${imageName}`}
                    alt={`${pieceName}`}
                    className="captured-piece"
                    style={{ left: `${offsetX + i * 20}px`, zIndex: i }}
                />
            );
        }
        return <div key={pieceType} className="piece-stack">{images}</div>;
    };

    return (
        <section className="piece-graveyard">
            {pieces}
        </section>
    );
};

export default PieceGraveyard;