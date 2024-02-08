import React, { useState } from 'react'
import io from 'socket.io-client';
import ChatBox from './ChatBox';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

const socket = io.connect("http://localhost:3002"); 
export default function Chat() {
  const [room, setRoom] = useState("");
  const roomList = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];
  const [message, setMessage] = useState("");
  const [showChatBox, setChatBox] = useState(false);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { message });
      setMessage("");
    }
  }

  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
      setChatBox(true); 
    }
  }

  const leaveRoom = () => {
    if (showChatBox) {
      socket.emit("leave_room", { room });
      setChatBox(false); 
    }
  }

  return (
    <div>
      {/* <Navbar /> */}
      {!showChatBox && (
        <div style={styles.container}>
          <h3>Welcome to real-time chat</h3>
          <select style={styles.select} value={room} onChange={(e) => setRoom(e.target.value)}>
            <option>Select Room</option>
            {roomList.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <button style={styles.button} onClick={joinRoom}>Join room</button>
        </div>
      )}

      {showChatBox && (
        <ChatBox
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          leaveRoom={leaveRoom}
        />
      )}
    </div>
  )
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',

  },
  button: {
    marginTop: '10px',
    padding: '8px 15px',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
},
select: {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
},
}