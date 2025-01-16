import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

/**
 * useSocket hook to handle WebSocket logic.
 *
 * @param {string} serverUrl - The URL of the Socket.IO server.
 * @param {string} event - The event to listen for.
 * @returns {Array} [data, sendData]
 */
const useSocket = (serverUrl, event) => {
  const [data, setData] = useState(null); // State to store the latest data
  const socketRef = useRef(null); // Ref to persist the socket instance

  useEffect(() => {
    // Initialize the socket connection
    const socket = io(serverUrl);
    socketRef.current = socket;

    // Listen for the specified event
    socket.on(event, (incomingData) => {
      setData(incomingData); // Update the state when new data arrives
    });

    // Cleanup function: disconnect the socket when the component unmounts
    return () => {
      socket.off(event); // Stop listening for the event
      socket.disconnect(); // Disconnect the socket
    };
  }, [serverUrl, event]); // Re-run if serverUrl or event changes

  // Function to send data to the server
  const sendData = (emitEvent, payload) => {
    if (socketRef.current) {
      socketRef.current.emit(emitEvent, payload);
    }
  };

  return [data, sendData]; // Return the latest data and the sendData function
};

export default useSocket;
