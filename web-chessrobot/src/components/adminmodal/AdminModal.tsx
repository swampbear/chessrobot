import React, { useState, useEffect, useRef } from 'react';
import './AdminModal.css';
import { useSocket } from '../../contextproviders/socket/SocketContext';

interface AdminModalProps {
    onClose: () => void;
}

const AdminModal = ({ onClose }: AdminModalProps) => {
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [calibratedPoints, setCalibratedPoints] = useState([false, false, false]);
    const [isCalibrating, setIsCalibrating] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (!loggedIn) {
            inputRef.current?.focus();
        }
    }, [loggedIn]);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        if (password === 'admin') {
            setLoggedIn(true);
        } else {
            alert('Invalid password');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setPassword('');
        setCalibratedPoints([false, false, false]); // Reset calibration points
        setIsCalibrating(false);
    };

    const handleCalibration = (positionNumber: number) => {
        socket?.emit('calibrate', positionNumber);
        setCalibratedPoints((prev) =>
            prev.map((point, index) => (index === positionNumber ? true : point))
        );
    };

    const handleStartCalibration = () => {
        setIsCalibrating(true);
    };

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = () => {
        // Perform any final confirmation actions here
        alert('Calibration confirmed!');
        setIsCalibrating(false);
    };

    return (
        <div className="admin-modal-container">
            <div className="admin-modal">
                <button className="admin-modal-close" onClick={handleClose}>×</button>
                {loggedIn ? (
                    <div>
                        <h2>Admin Panel</h2>
                        <button onClick={handleLogout}>Logout</button>
                        <h3>Calibration Settings</h3>
                        {isCalibrating ? (
                            <div className="admin-buttons">
                                <button
                                    onClick={() => handleCalibration(0)}
                                    disabled={calibratedPoints[0]}
                                >
                                    Calibrate Start Point 1 {calibratedPoints[0] && '✓'}
                                </button>
                                <button
                                    onClick={() => handleCalibration(1)}
                                    disabled={calibratedPoints[1]}
                                >
                                    Calibrate Start Point 2 {calibratedPoints[1] && '✓'}
                                </button>
                                <button
                                    onClick={() => handleCalibration(2)}
                                    disabled={calibratedPoints[2]}
                                >
                                    Calibrate Start Point 3 {calibratedPoints[2] && '✓'}
                                </button>
                                <button id='confirm-button' onClick={handleConfirm}>Confirm Calibration</button>
                            </div>
                        ) : (
                            <button onClick={handleStartCalibration}>Calibrate Robot</button>
                        )}
                    </div>
                ) : (
                    <div className="admin-login-container">
                        <h2>Enter admin password</h2>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            ref={inputRef}
                            autoFocus
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminModal;