# Multi-User Whiteboard 🎨

Welcome to the **Multi-User Whiteboard** project! This is a real-time collaborative whiteboard application that allows multiple users to draw simultaneously on a shared canvas. Built using HTML5, JavaScript, and WebSocket, this project is perfect for collaborative brainstorming, online teaching, or just having fun with friends!

## Features ✨

- **Real-Time Collaboration**: Multiple users can draw on the same canvas simultaneously.
- **Dynamic Canvas**: The canvas adjusts to the size of the browser window for a seamless experience.
- **Random User Colors**: Each user is assigned a unique color for their drawings.
- **Clear Canvas**: A single button clears the canvas for all users.
- **WebSocket Integration**: Ensures fast and efficient real-time communication between users.

## How It Works 🛠️

The application uses **WebSocket** to enable real-time communication between users. When a user draws on the canvas, their strokes are immediately sent to the server and broadcasted to all other connected users. The canvas is dynamically resized to fit the browser window, and each user is assigned a random color to differentiate their contributions.

## Technologies Used 💻

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js with WebSocket (`ws` library)
- **Real-Time Communication**: WebSocket protocol

## Installation and Setup 🚀

### Prerequisites

1. **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **WebSocket Library**: Install the `ws` library using npm.

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/multi-user-whiteboard.git
   cd multi-user-whiteboard
