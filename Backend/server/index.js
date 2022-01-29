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

let websocketClients = [];

const registerClient = (connection) => {
  const clientId = Date.now();
  websocketClients.push({ id: clientId, connection: connection });
  return clientId;
};
const removeClient = (clientId) => {
  if (clientId) {
    websocketClients = websocketClients.filter((client) => client.id !== clientId);
  } else {
    console.error(
      `${new Date().toISOString()} No client id provided when removing client from client list`
    );
  }
};

const broadcastSignature = (documentId) => {
  try{
    console.log(`${new Date().toISOString()} Messaging clients`);
    websocketClients.forEach((client) => {
      client.connection.sendUTF(
        JSON.stringify({ type: "document-signature", payload: documentId })
      );
    });
  } catch(error) {
    console.log(`${new Date().toISOString()} Error occurred when Messaging clients`);
    console.log(`${error.message}`);
  }
};

initializeWebsocket(server, databaseClient, registerClient, removeClient);
initializeExpressApp(databaseClient, broadcastSignature);
