const server = require("./src/server");
const PORT = process.env.PORT;

server.listen(PORT, () =>
    console.log(`You Can Go To Server On http://127.0.0.1:${PORT}`)
);
