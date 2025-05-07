const express = require("express");
const WebSocket = require("ws");
const app = express();
const PORT = 3000;

const app_id = "70223";  // Your Deriv App ID
const api_token = "your_api_token";  // Replace with your actual API token

// Connect to Deriv WebSocket API
const socket = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=" + app_id);

socket.on("open", () => {
  console.log("Connected to Deriv API");
  socket.send(JSON.stringify({ authorize: api_token }));
});

socket.on("message", (data) => {
  const response = JSON.parse(data);
  if (response.error) {
    console.log("Error connecting to Deriv API:", response.error.message);
  } else {
    console.log("Successfully connected to Deriv API!");
  }
});

socket.on("close", () => {
  console.log("Connection closed");
});

socket.on("error", (err) => {
  console.error("Connection error:", err);
});

app.get("/", (req, res) => {
  res.send("Server is running! Check the console for API connection status.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
