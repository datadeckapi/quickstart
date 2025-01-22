# [Deck](https://deck.co) Quickstart (Python)

This is a minimal app that implements Deck using a very basic HTML/vanilla JS frontend with a Flask/Python backend. After linking a sample utility account, the app retrieves information associated with the account and renders it on the home page.

![Screenshot of the app](https://i.imgur.com/UBDKovj.png)

# Running the app

## Equip the app with credentials

Add the [client ID and Sandbox secret from your Deck dashboard](https://app.deck.co) to a `.env` file. Don't place quotes (`"`) around the credentials (i.e., `DECK_CLIENT_ID=adn08a280hqdaj0ad`). Use the "Sandbox" secret when setting the `DECK_SECRET` variable.

```bash
# .env
DECK_CLIENT_ID=
DECK_SECRET=
```

![Credentials](https://i.imgur.com/CNpRnby.png)

## Start the server

```bash
docker-compose up
```

The app will run on port 8000.

# Using the app

When connecting a utility provider, use the following sample credentials:

- Username: `user_good`
- Password: `pass_good`
