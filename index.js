const net = require("net");
const server = net.createServer();

server.listen("9000", () => {
  console.log("server listening to %j", server.address());
});

server.on("connection", (connection) => {
  const { remoteAddress, remotePort } = connection;

  connection.setEncoding("utf8");
  console.log("New connection from %s", `${remoteAddress}:${remotePort}`);

  connection.on("data", (data) => {
    console.log("Connection data from %s: %j", remoteAddress, data);
    connection.write(data);
  });

  connection.once("close", () => {
    console.log("Connection closed");
  });

  connection.on("error", () => {
    console.log("Connection error");
  });
});
