import React from 'react';
import './Tile.css';
interface Props {
    image?: string;
    number: number;
}
export default function Tile({number, image}: Props) {
    let isOdd = number % 2 === 1;
    return (
    <div className={`tile ${isOdd ? 'white-tile' : 'black-tile'}`}>
        {image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'> </div>}
    </div>)

}