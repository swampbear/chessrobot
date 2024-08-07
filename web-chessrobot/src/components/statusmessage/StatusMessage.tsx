import React, { useEffect, useState } from "react";
import "./StatusMessage.css";

interface StatusMessageProps {
    message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
    const [displayedMessage, setDisplayedMessage] = useState("");
    const [isBlinking, setIsBlinking] = useState(true);

    useEffect(() => {
        if (message) {
            setDisplayedMessage(message);
            setIsBlinking(true);
            const blinkTimeout = setTimeout(() => {
                setIsBlinking(false);
            }, 2000); // Blinking for 2 seconds

            return () => {
                clearTimeout(blinkTimeout);
            };
        }
    }, [message]);

    return (
        <div id="status-message" className={isBlinking ? "blink-animation" : ""}>
            <p className="fade-in-text" style={{ fontSize: '2.5rem', fontWeight: '700', }}>{displayedMessage}</p>
        </div>
    );
};

export default StatusMessage;