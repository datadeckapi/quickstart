# Datadeck Quickstart (Python)

This is a minimal app that implements Datadeck using a very basic HTML/vanilla JS frontend with a Flask/Python backend. After linking a sample utility account, the app retrieves information associated with the account and renders it on the home page.

![Screenshot of the app](https://i.imgur.com/UBDKovj.png)

# Running the app

## Equip the app with credentials

Add the [client ID and Sandbox secret from your Datadeck dashboard](https://app.datadeck.co) to a `.env` file. Don't place quotes (`"`) around the credentials (i.e., `DATADECK_CLIENT_ID=adn08a280hqdaj0ad`). Use the "Sandbox" secret when setting the `DATADECK_SECRET` variable.

```bash
# .env
DATADECK_CLIENT_ID=
DATADECK_SECRET=
```

## Start the server

```bash
docker-compose up
```

The app will run on port 8000.

# Using the app

When connecting a utility provider, use the following sample credentials:

- Username: `user_good`
- Password: `pass_good`
