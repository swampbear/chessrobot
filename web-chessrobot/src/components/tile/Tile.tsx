import React, { useEffect, useState } from 'react';
import './Tile.css';
interface Props {
    image?: string;
    number: number;
}
export default function Tile({number, image}: Props) {
    const[isOdd] = useState(number % 2 === 1)
    const[imageUrl, setImageUrl] = useState(image);

    useEffect (()=> {
       setImageUrl(image)
    },[image]);
    
    return (
    <div className={`tile ${isOdd ? 'white-tile' : 'black-tile'}`}>
        {image && <div style={{backgroundImage: `url(${imageUrl})`}} className='chess-piece'> </div>}
    </div>)

}