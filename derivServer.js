const express = require("express");
const { BinarySocket } = require("deriv-api");
const app = express();
const PORT = 3000;

const app_id = "70223";  // Your Deriv App ID
const api_token = "your_api_token";  // Replace with your actual API token

// Connect to Deriv API
const socket = new BinarySocket({ app_id: app_id, api_token: api_token });

app.get("/", (req, res) => {
  socket.open().then(() => {
    socket.send({ "authorize": api_token }).then(response => {
      if (response.error) {
        res.send("Error connecting to Deriv API: " + response.error.message);
      } else {
        res.send("Successfully connected to Deriv API!");
      }
      socket.close();
    }).catch(err => res.send("Connection failed: " + err));
  });
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});
