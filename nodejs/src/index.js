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
    let eventsElement = document.querySelector(".js-events");
    eventsElement.textContent += `[${timestamp}] ${eventText}\n`;
    // Auto-scroll to the bottom with smooth behavior
    eventsElement.scrollTo({
      top: eventsElement.scrollHeight,
      behavior: "smooth",
    });
  }

  async function startLink(event) {
    const button = event.target;
    if (button) button.disabled = true;

    const { link_token: token } = await client.createToken();

    const handler = Deck.create({
      token,
      // A single source can be specified, this will skip the source select screen.
      // For the skip to work, make sure that the source specified here would appear normally on the source select screen.
      // source_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      onExit() {
        logEvent("onExit()");
        if (button) button.disabled = false;
      },
      async onSuccess({ public_token }) {
        handler.exit();
        logEvent("onSuccess(): Exchanging public token for access token...");
        await client.exchangePublicToken(public_token);
        logEvent("onSuccess(): Done!");
        logEvent("Continue by selecting an action.");
        document
          .querySelectorAll(".btn-demo:not(.sustainability-file)")
          .forEach((btn) => {
            btn.disabled = false;
          });
        if (button) button.disabled = false;
      },
    });

    handler.open();
  }

  async function getBillData() {
    logEvent("Getting bill data...");
    await client
      .getData("api/bill")
      .then((res) => logEvent(JSON.stringify(res, undefined, 2)));
  }

  async function getSustainabilityData() {
    logEvent("Getting sustainability data...");
    await client.getData("api/sustainability").then((res) => {
      logEvent(JSON.stringify(res, undefined, 2));
      document.querySelectorAll(".sustainability-file").forEach((btn) => {
        btn.disabled = false;
      });
    });
  }

  async function getBillStatement() {
    logEvent("Getting bill statement data...");
    await client
      .getData("api/bill/statement")
      .then((res) => logEvent(JSON.stringify(res, undefined, 2)));
  }

  async function getSustainabilityFile() {
    logEvent("Getting sustainability file data...");
    await client
      .getData("api/sustainability/statement/file")
      .then((res) => logEvent(JSON.stringify(res, undefined, 2)));
  }

  context.startLink = startLink;
  context.getBillData = getBillData;
  context.getSustainabilityData = getSustainabilityData;
  context.getBillStatement = getBillStatement;
  context.getSustainabilityFile = getSustainabilityFile;

  // Uncomment to start the Link flow automatically
  // startLink();
})(window);
