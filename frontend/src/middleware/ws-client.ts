import { DocumentMetaData } from "../models/Document";

const W3CWebSocket = require("websocket").w3cwebsocket;

const createClient = (
  initializeDocuments: (documents: DocumentMetaData[]) => void
) => {
  const client = new W3CWebSocket("ws://localhost:8080/", "echo-protocol");

  client.onerror = function () {
    console.log("Connection Error");
  };

  client.onopen = function () {
    console.log("WebSocket Client Connected");
  };

  client.onclose = function () {
    console.log("echo-protocol Client Closed");
  };

  client.onmessage = (e: { data: string }) => {
    if (typeof e.data === "string") {
      console.log("Received: '" + e.data + "'");
      const message = JSON.parse(e.data)
      if(message.type === 'initial')
        initializeDocuments(message.payload)
    }
  };
  return client;
};

export default createClient;
