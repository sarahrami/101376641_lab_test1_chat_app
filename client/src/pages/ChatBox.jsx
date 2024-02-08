import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3002");

export default function ChatBox({ message, setMessage, sendMessage, leaveRoom }) {
    // const [users, setUsers] = useState([]);
    // const [currentUser, setCurrentUser] = useState(undefined)
    // const [messages, setMessages] = useState([]);
    

    return (
        <div style={styles.container}>
            <div style={styles.messagesContainer}>
                {/* messages here */}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type='text'
                    placeholder='Type your message...'
                    onChange={(e) => setMessage(e.target.value)}
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>Send</button>
            </div>

            <div style={styles.leaveButtonContainer}>
                <button onClick={leaveRoom} style={styles.leaveButton}>Leave room</button>
            </div>
        </div>
    );
}



const styles = {
    container: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    messagesContainer: {
        height: '300px',
        overflowY: 'auto',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
    },
    inputContainer: {
        display: 'flex',
        marginBottom: '15px',
    },
    input: {
        flex: '1',
        padding: '8px',
        marginRight: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '8px 15px',
        borderRadius: '4px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        cursor: 'pointer',
    },
    typingIndicator: {
        fontStyle: 'italic',
        color: '#555',
    },
    leaveButtonContainer: {
        textAlign: 'center',
    },
    leaveButton: {
        padding: '8px 15px',
        borderRadius: '4px',
        backgroundColor: '#FF6347',
        color: '#fff',
        cursor: 'pointer',
    },
};
