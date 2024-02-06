const express = require("express");

const app = express();

// app.get("/health", (req, res) => {
//   res.send("Healthy");
// });

app.use("/example", express.static("example"));

app.use("/motorcycle", express.static("motorcycle"));

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
