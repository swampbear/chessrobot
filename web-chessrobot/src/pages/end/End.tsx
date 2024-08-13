import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './End.css';
import { useSocket } from '../../contextproviders/socket/SocketContext';

const End = () => {
    const navigate = useNavigate();
    const {socket} = useSocket();
    const [outcome, setOutcome] = React.useState<string>('');

    useEffect(() => {
        if (socket) {
            socket.emit('getOutcome');
            socket.on('getOutcome', (msg) => {
                setOutcome(msg);
                console.log('Game Over:', msg);
            });
        }
    },[socket]); 

    const handleReturnHome = () => {
        navigate('/home');
    };

    return (
        <div className='gradientBackground'>
            <div className="end-container">
                <div className="end-content">
                    <h1>Game Over</h1>
                    {outcome === 'lost' && <h1>You lost!</h1>}
                    {outcome === 'won' && <h1>You won!</h1>}
                    {outcome === 'draw' && <h1>It's a draw!</h1>}
                    <button onClick={handleReturnHome}>Return to Home</button>
                </div>
            </div>
        </div>
    );
};

export default End;