import React, { useEffect, useState } from 'react';
import './Tile.css';

interface Props {
    image?: string;
    number: number;
    x: number;
    y: number;
}

const Tile: React.FC<Props> = ({ number, image, x, y }) => {
    const [isOdd] = useState(number % 2 === 1);
    const [imageUrl, setImageUrl] = useState(image);

    useEffect(() => {
        setImageUrl(image);
    }, [image]);

    return (
        <div className={`tile ${isOdd ? 'white-tile' : 'black-tile'}`}>
            {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} className='chess-piece'> </div>}
        </div>
    );
};

export default React.memo(Tile, (prevProps, nextProps) => {
    return prevProps.image === nextProps.image && prevProps.number === nextProps.number;
});