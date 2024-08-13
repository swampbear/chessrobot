import React, { useState } from 'react';
import './ResignModal.css'

interface ResignModalProps {
    visible?: boolean;
    onCancel: () => void;
    onResign: () => void;
}

/**
 * ResignModal component.
 *
 * This component displays a modal dialog asking the user if they want to resign from the game.
 * It provides two buttons: "Cancel" and "Resign".
 *
 * @component
 * @example
 * ```tsx
 * <ResignModal onCancel={handleCancel} onResign={handleResign} />
 * ```
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onCancel - The callback function to be called when the "Cancel" button is clicked.
 * @param {Function} props.onResign - The callback function to be called when the "Resign" button is clicked.
 * @returns {JSX.Element} The rendered ResignModal component.
 */
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