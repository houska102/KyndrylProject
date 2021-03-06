const express = require("express");

const initializeExpressApp = (databaseClient, broadcastSignature) => {
  const app = express();
  app.post("/sign/:documentId", function (req, res) {
    const documentId = `${req.params.documentId}`;
    try {
      if (!databaseClient.has(documentId))
        throw new Error(`document id: ${documentId} not found`);
        
      console.log(
        `${new Date().toISOString()} Signing document id ${documentId}`
      );
      const savedDocument = databaseClient.get(documentId);
      const newDocument = {
        ...savedDocument,
        isSigned: true,
      };
      databaseClient.set(documentId, newDocument);
      databaseClient.sync();

      broadcastSignature(documentId);
      res.status(200);
      res.send(JSON.stringify(newDocument));
      console.log(
        `${new Date().toISOString()} Document id ${documentId} signed`
      );
    } catch (error) {
      console.error(`${new Date().toISOString()} ${error.message}`);
      res.status(404);
      res.send(error.message);
    }
  });

  app.listen(5000);
  return app;
};

module.exports = initializeExpressApp;
