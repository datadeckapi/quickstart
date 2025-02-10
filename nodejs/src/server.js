/*
server.js – Uses Express to defines routes that call Deck endpoints in the Sandbox environment.
*/

require("dotenv").config();
const fs = require("fs");
const { Readable } = require("stream");
const express = require("express");
const session = require("express-session");
const path = require("path");
const util = require("util");
const app = express();
let statement_id = 0;

app.use(
  // FOR DEMO PURPOSES ONLY
  // Use an actual secret key in production
  session({ secret: "bosco", saveUninitialized: true, resave: true })
);

// Replace body-parser with native express methods
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve index.js
app.get("/index.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.js"));
});

const client = {
  _api: "https://sandbox.deck.co/api/v1",
  post(endpoint, bodyJson = {}) {
    return fetch(`${this._api}/${endpoint}`, {
      method: "POST",
      headers: {
        "x-deck-client-id": process.env.DECK_CLIENT_ID,
        "x-deck-secret": process.env.DECK_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });
  },
};

// Creates a Link token and return it
app.post("/api/create_link_token", async (req, res, next) => {
  const response = await client.post("link/token/create");
  res.json(await response.json());
});

// Exchanges the public token from Deck Link for an access token
app.post("/api/exchange_public_token", async (req, res, next) => {
  const exchangeResponse = await client.post(
    "connection/public_token/exchange",
    {
      public_token: req.body.public_token,
    }
  );

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  const data = await exchangeResponse.json();
  req.session.access_token = data.access_token;
  res.json(true);
});

app.get("/api/bill", async (req, res, next) => {
  const access_token = req.session.access_token;
  console.log("## Calling Deck bill/get...");
  const balanceResponse = await client.post("bill/get", {
    access_token,
  });
  // console.log("-------\nResponse:\n", balanceResponse);
  const Balance = await balanceResponse.json();
  console.log(
    "-------\nBody:\n",
    util.inspect(Balance, { showHidden: false, depth: null, colors: true })
  );
  res.json(Balance);
});

app.get("/api/bill/statement", async (req, res, next) => {
  const access_token = req.session.access_token;
  console.log("## Calling Deck bill/statement...");
  const balanceResponse = await client.post("bill/statement", {
    access_token,
  });
  // console.log("-------\nResponse:\n", balanceResponse);
  const Balance = await balanceResponse.json();
  console.log(
    "-------\nBody:\n",
    util.inspect(Balance, { showHidden: false, depth: null, colors: true })
  );
  res.json(Balance);
});

app.get("/api/sustainability", async (req, res, next) => {
  const access_token = req.session.access_token;
  console.log("## Calling Deck sustainability/get...");
  const sustainabilityResponse = await client.post("sustainability/get", {
    access_token,
  });
  // console.log("-------\nResponse:\n", sustainabilityResponse);
  const sustainabilityData = await sustainabilityResponse.json();
  console.log(
    "-------\nBody:\n",
    util.inspect(sustainabilityData, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
  // set statement_id for later use
  statement_id = sustainabilityData.accounts[0].statements[0].statement_id;
  console.log("-------\nStatement id:\n", statement_id);
  res.json(sustainabilityData);
});

app.get("/api/sustainability/statement/file", async (req, res, next) => {
  if (statement_id === 0) {
    return res.status(400).json({ error: "No statement_id available yet" });
  }
  const access_token = req.session.access_token;
  console.log("## Calling Deck sustainability/statement/file...");
  const fileResponse = await client.post("sustainability/statement/file", {
    access_token,
    statement_id: statement_id,
  });
  // console.log("-------\nResponse:\n", fileResponse, fileResponse.body);

  const readableNodeStream = Readable.fromWeb(fileResponse.body);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputPath = path.join(
    `./files/sustainability_statement_${timestamp}.pdf`
  );
  const fileStream = fs.createWriteStream(outputPath);

  // Pipe the readable stream into the writable stream
  await new Promise((resolve, reject) => {
    readableNodeStream.pipe(fileStream);
    readableNodeStream.on("error", reject);
    fileStream.on("finish", resolve);
  });

  console.log(`File saved to ${outputPath}`);

  res.json({ file: outputPath });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://127.0.0.1:${PORT}`);
});
