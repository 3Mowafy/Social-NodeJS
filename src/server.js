const express = require("express");
const path = require("path");
const cors = require("cors");

const server = express();

require("dotenv").config();
require("../db/connect");

server.use(express.static(path.join(__dirname, "../public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const postRouter = require("../routes/posts.route");

server.use("/posts", postRouter);

server.get("", (req, res) => {
    res.status(200).send({
        apiStatus: true,
        data: "",
        message: "Server Is Started, Check APIs",
    });
});

server.all("*", (req, res) => {
    res.status(404).send({
        apiStatus: false,
        data: "",
        message: "URL Not Corrected",
    });
});

module.exports = server;
