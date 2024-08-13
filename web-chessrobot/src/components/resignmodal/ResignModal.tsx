import React, { useState } from 'react';
import './ResignModal.css'

interface ResignModalProps {
    visible?: boolean;
    onCancel: () => void;
    onResign: () => void;
}

const ResignModal = ({ onCancel, onResign } : ResignModalProps) => {

    const handleCancel = () => {
        onCancel();
    };

    const handleResign = () => {
        onResign();
    };

    return (
        <div className='resign-modal-container'>
            <div className="resign-modal">
                <h2>Are you sure you want to resign</h2>
                <p> This is you last chance to stand up and fight against the machines. Think wisely about your discition</p>
                <div className="resign-buttons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleResign} >
                        Resign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResignModal;