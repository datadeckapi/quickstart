/*
server.js – Uses Express to defines routes that call Deck endpoints in the Sandbox environment.
*/

require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require("path")
const app = express()

app.use(
  // FOR DEMO PURPOSES ONLY
  // Use an actual secret key in production
  session({ secret: "bosco", saveUninitialized: true, resave: true })
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Serve index.js
app.get("/index.js", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.js"))
})

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
    })
  },
}

// Creates a Link token and return it
app.post("/api/create_link_token", async (req, res, next) => {
  const response = await client.post("link/token/create")
  res.json(await response.json())
})

// Exchanges the public token from Deck Link for an access token
app.post("/api/exchange_public_token", async (req, res, next) => {
  const exchangeResponse = await client.post(
    "connection/public_token/exchange",
    {
      public_token: req.body.public_token,
    }
  )

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  const data = await exchangeResponse.json()
  req.session.access_token = data.access_token
  res.json(true)
})

// Fetches balance data
app.get("/api/data", async (req, res, next) => {
  const access_token = req.session.access_token
  const balanceResponse = await client.post("bill/get", { access_token })
  const Balance = await balanceResponse.json()

  res.json({
    Balance,
  })
})

app.listen(process.env.PORT || 8080)
