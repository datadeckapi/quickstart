(function linkSdkIIFE(context) {
  const client = {
    _api: "http://127.0.0.1:8080",
    _headers: {
      "Content-Type": "application/json",
    },

    async createToken() {
      const response = await fetch(`${this._api}/api/create_link_token`, {
        method: "POST",
        headers: this._headers,
      });

      return response.json();
    },

    async exchangePublicToken(public_token) {
      const response = await fetch(`${this._api}/api/exchange_public_token`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ public_token }),
      });
      return response.json();
    },

    async getData(endpoint) {
      const response = await fetch(`${this._api}/${endpoint}`, {
        method: "GET",
        headers: this._headers,
      });
      return response.json();
    },
  };

  function logEvent(eventText) {
    const timestamp = new Date().toLocaleTimeString();
    document.querySelector(
      ".js-events"
    ).textContent += `[${timestamp}] ${eventText}\n`;
  }

  async function startLink() {
    const { link_token: token } = await client.createToken();

    const handler = Deck.create({
      token,

      // A single source can be specified, this will skip the source select screen.
      // For the skip to work, make sure that the source specified here would appear normally on the source select screen.
      // source_id: "09320c5d-8552-47df-8aa3-98fe1c0b5505",

      onExit() {
        logEvent("onExit()");
      },
      async onSuccess({ public_token }) {
        handler.exit();
        logEvent("onSuccess(): Exchanging public token for access token...");
        await client.exchangePublicToken(public_token);
        logEvent("onSuccess(): Done!");
        logEvent("Continue by selecting an action.");
        document.querySelectorAll(".btn-demo").forEach((btn) => {
          btn.disabled = false;
        });
      },
    });

    handler.open();
  }

  async function getBillData() {
    logEvent("Getting bill data...");
    const { Balance } = await client.getData("api/bill");
    logEvent(JSON.stringify(Balance, undefined, 2));
  }

  async function getSustainabilityData() {
    logEvent("Getting sustainability data...");
    const { Balance } = await client.getData("api/sustainability");
    logEvent(JSON.stringify(Balance, undefined, 2));
  }

  context.startLink = startLink;
  context.getBillData = getBillData;
  context.getSustainabilityData = getSustainabilityData;

  // Uncomment to start the Link flow automatically
  // startLink();
})(window);
