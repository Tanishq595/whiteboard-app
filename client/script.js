const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        canvas.height = window.innerHeight - 100;  //canvas height
        canvas.width = window.innerWidth - 50;  //canvas width

        context.lineWidth = 5;  //brush size

        let x = null, y = null;
        let draw = false;
        let userColor = getRandomColor();

        let socket;

        // Function to connect to the WebSocket server
        function connectWebSocket() {
            socket = new WebSocket("ws://localhost:8080");

            socket.onopen = () => {
                console.log("WebSocket connection established");
            };

            socket.onclose = () => {
                console.log("WebSocket connection closed. Reconnecting...");
                setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
            };

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === "init") {
                    // Render all existing strokes
                    data.data.forEach((stroke) => {
                        drawLine(stroke.x, stroke.y, stroke.currentX, stroke.currentY, stroke.color);
                    });
                } else if (data.clear) {
                    // Clear the canvas
                    context.clearRect(0, 0, canvas.width, canvas.height);
                } else {
                    // Draw a line based on the received data
                    drawLine(data.x, data.y, data.currentX, data.currentY, data.color);
                }
            };
        }

        // Generate a random color for the user
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Handle mouse events for drawing
        window.addEventListener('mousedown', (e) => {
            draw = true;
            [x, y] = [e.clientX, e.clientY];
        });

        window.addEventListener('mouseup', () => draw = false);

        window.addEventListener('mousemove', (e) => {
            if (!draw) return;

            const currentX = e.clientX;
            const currentY = e.clientY;

            // Send drawing data to the server
            socket.send(JSON.stringify({ x, y, currentX, currentY, color: userColor }));

            // Draw locally
            drawLine(x, y, currentX, currentY, userColor);

            [x, y] = [currentX, currentY];
        });

        // Function to draw a line
        function drawLine(startX, startY, endX, endY, color) {
            context.strokeStyle = color;
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();
        }

        // Handle the clear button click
        document.getElementById('clear').onclick = function () {
            // Clear the canvas locally
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Send a clear request to the server
            socket.send(JSON.stringify({ clear: true }));
        };

        // Connect to the WebSocket server
        connectWebSocket();