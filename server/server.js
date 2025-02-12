const WebSocket = require("ws");

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Store the canvas state (all strokes)
const canvasState = [];

wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send the current canvas state to the new client
    ws.send(JSON.stringify({ type: "init", data: canvasState }));

    // Handle messages from clients
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.clear) {
            // Clear the canvas state
            canvasState.length = 0;
        } else {
            // Add the new stroke to the canvas state
            canvasState.push(data);
        }

        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    // Handle client disconnection
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on ws://localhost:8080");