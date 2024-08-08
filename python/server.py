from flask import Flask, render_template, request, session
import os
import requests

app = Flask(__name__)
app.secret_key = 'quickstart'

@app.route("/")
def index():
  return render_template('index.html')

class Client:
    def __init__(self):
        self._api = "https://sandbox.datadeck.co/api/v1"

    def post(self, endpoint, bodyJson={}):
        headers = {
            "x-datadeck-client-id": os.environ.get("DECK_CLIENT_ID"),
            "x-datadeck-secret": os.environ.get("DECK_SECRET"),
            "Content-Type": "application/json",
        }
        response = requests.post(f"{self._api}/{endpoint}", headers=headers, json=bodyJson)
        return response

client = Client()

# Creates a Link token and return it
@app.route("/api/create_link_token", methods=["POST"])
def create_link_token():
    response = client.post("link/token/create")
    return response.json()

# Exchanges the public token from Deck Link for an access token
@app.route("/api/exchange_public_token", methods=["POST"])
def exchange_public_token():
    exchangeResponse = client.post("connection/public_token/exchange", {
        "public_token": request.json.get("public_token")
    })

    # FOR DEMO PURPOSES ONLY
    # Store access_token in DB instead of session storage
    data = exchangeResponse.json()
    session["access_token"] = data["access_token"]
    return "true"

# Fetches balance data
@app.route("/api/data", methods=["GET"])
def fetch_balance_data():
    access_token = session.get("access_token")
    balanceResponse = client.post("bill/get", { "access_token": access_token })
    Balance = balanceResponse.json()

    return {
        "Balance": Balance
    }
