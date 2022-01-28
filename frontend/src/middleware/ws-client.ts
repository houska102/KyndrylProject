import { DocumentMetaData } from "../models/Document";

const W3CWebSocket = require("websocket").w3cwebsocket;
const serverUri = process.env.REACT_APP_WEBSOCKET_URL;
const createClient = (
  initializeDocuments: (documents: DocumentMetaData[]) => void,
  signDocument: (id: number) => void
) => {
  const client = new W3CWebSocket(serverUri, "document-signature");

  client.onerror = function () {
    console.log("Connection Error");
  };

  client.onopen = function () {
    console.log("WebSocket Client Connected");
  };

  client.onclose = function () {
    console.log("document-signature Client Closed");
  };

  client.onmessage = (e: { data: string }) => {
    if (typeof e.data === "string") {
      console.log("Received: '" + e.data + "'");
      const message = JSON.parse(e.data);
      if (message.type === "initial") {
        initializeDocuments(message.payload);
      } else if (message.type === "document-signature") {
        signDocument(+message.payload);
      }
    }
  };
  return client;
};

export default createClient;
