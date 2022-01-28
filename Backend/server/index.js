const http = require("http");
const JSONdb = require("simple-json-db");
const initializeExpressApp = require("./initializeExpressApp");
const initializeWebsocket = require("./initializeWebsocket");

const server = http.createServer((request, response) => {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(8080, (request, response) => {
  console.log(new Date().toISOString() + " Server is listening on port 8080");
});
const databaseClient = new JSONdb("./database/content.json");

let clients = [];
const registerClient = (connection) => {
  const connectionId = Date.now();
  clients.push({ id: connectionId, connection: connection });
  return connectionId;
};
const removeClient = (clientId) => {
  if (connectionId) {
    clients = clients.filter((client) => client.id !== clientId);
  } else {
    console.error(
      `${new Date().toISOString()} No client id provided when removing client from client list`
    );
  }
};

const broadcastSignature = (documentId) => {
  console.log(`${new Date().toISOString()} Messaging clients`);
  clients.forEach((client) => {
    client.connection.sendUTF(
      JSON.stringify({ type: "document-signature", payload: documentId })
    );
  });
};

initializeWebsocket(server, databaseClient, registerClient, removeClient);
initializeExpressApp(databaseClient, broadcastSignature);
