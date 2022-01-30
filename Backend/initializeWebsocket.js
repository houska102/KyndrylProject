const WebSocketServer = require("websocket").server;

const transformDatabaseContentToList = (databaseContent) => {
  const itemList = [];
  for (id in databaseContent) {
    itemList.push({
      ...databaseContent[id],
      id: +id,
    });
  }
  return itemList;
};
const originIsAllowed = (origin) => {
  return true;
};

const initializeWebsocket = (
  server,
  databaseClient,
  registerClient,
  removeClient
) => {
  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

  wsServer.on("request", (request) => {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log(
        new Date().toISOString() +
          " Connection from origin " +
          request.origin +
          " rejected."
      );
      return;
    }
    try {
      const connection = request.accept("document-signature", request.origin);
      const connectionId = registerClient(connection);
      console.log(new Date().toISOString() + " Connection accepted.");

      console.log(new Date().toISOString() + " Getting initial documents.");
      const documentsContent = transformDatabaseContentToList(
        databaseClient.JSON()
      );
      console.log(
        new Date().toISOString() + " Sending initial documents to client."
      );
      connection.sendUTF(
        JSON.stringify({ type: "initial", payload: documentsContent })
      );

      connection.on("close", function (reasonCode, description) {
        removeClient(connectionId);
        console.log(
          new Date().toISOString() +
            " Peer " +
            connection.remoteAddress +
            " disconnected."
        );
      });
    } catch (error) {
      console.log(
        `${new Date().toISOString()} Error occurred when connecting client`
      );
      console.log(`${error.message}`);
      request.reject();
      return;
    }
  });

  return wsServer;
};

module.exports = initializeWebsocket;
