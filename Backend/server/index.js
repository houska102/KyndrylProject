const WebSocketServer = require("websocket").server;
const http = require("http");
const JSONdb = require("simple-json-db");

const server = http.createServer((request, response) => {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8080, (request, response) => {
  console.log(new Date() + " Server is listening on port 8080");
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

const transformDatabaseContentToList = (databaseContent) => {
  const itemList = [];
  for (id in databaseContent) {
    itemList.push({
      ...databaseContent[id],
      id: +id
    });
  }
  return itemList;
};
const databaseClient = new JSONdb("./database/content.json");

function originIsAllowed(origin) {
  return true;
}

let clients = [];

wsServer.on("request", (request) => {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date().toISOString() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }
  const connectionId = Date.now();
  const connection = request.accept("document-signature", request.origin);
  clients.push({ id: connectionId, connection: connection });

  console.log(new Date().toISOString() + " Connection accepted.");
  console.log(new Date().toISOString() + " Getting initial documents.");
  const documentsContent = transformDatabaseContentToList(
    databaseClient.JSON()
  );
  console.log(new Date().toISOString() + " Sending initial documents to client.");
  connection.sendUTF(
    JSON.stringify({ type: "initial", payload: documentsContent })
  );

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log(new Date().toISOString() + " Received Message: " + message.utf8Data);
    }
  });

  connection.on("close", function (reasonCode, description) {
    clients = clients.filter((client) => client.id !== connectionId);
    console.log(
      new Date().toISOString() + " Peer " + connection.remoteAddress + " disconnected."
    );
  });
});

const express = require("express");
const app = express();

app.post("/sign/:documentId", function (req, res) {
  const documentId = `${req.params.documentId}`;
  try{
    if(!databaseClient.has(documentId))
      throw new Error("404-document id not found")
    console.log(`${new Date().toISOString()} Signing document id ${documentId}`);
    const savedDocument = databaseClient.get(documentId);
    const newDocument = {
      ...savedDocument,
      isSigned: true,
    };
    databaseClient.set(documentId, newDocument);
    databaseClient.sync();
    console.log(`${new Date().toISOString()} Messaging clients`);
    clients.forEach((client) => {
      client.connection.sendUTF(
        JSON.stringify({ type: "document-signature", payload: documentId })
      );
    });
    res.status(200);
    res.send(JSON.stringify(newDocument));
    console.log(`${new Date().toISOString()} Document id ${documentId} signed`);
  } catch(error){
    const [status, message] = error.message.split('-')
    res.status(+status);
    res.send(message);
  }
});

app.listen(5000);
