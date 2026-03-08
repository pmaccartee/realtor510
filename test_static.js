import express from "express";
const app = express();

app.use("/{*path}", (req, res) => {
    res.send("Catchall works!");
});

app.listen(3001, () => {
    console.log("Test server running");
});
