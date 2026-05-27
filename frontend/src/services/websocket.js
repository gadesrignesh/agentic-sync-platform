const SOCKET_URL = "wss://srignesh01-syncai-backend.hf.space/ws";

let socket = null;

export const connectWebSocket = (onMessage) => {

    socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {

        console.log("✅ WebSocket Connected");

    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        onMessage(data);

    };

    socket.onerror = (error) => {

        console.error("❌ WebSocket Error:", error);

    };

    socket.onclose = () => {

        console.log("🔴 WebSocket Closed");

    };

};

export const disconnectWebSocket = () => {

    if (socket) {

        socket.close();

    }

};
