# [Deck](https://deck.co) Quickstart (NodeJS)

This is a minimal app that implements Deck using a very basic HTML/vanilla JS frontend with an Express/Node backend. After linking a sample utility account, the app retrieves information associated with the account and renders it on the home page.

![Screenshot of the app](https://i.imgur.com/UBDKovj.png)

# Running the app

## Set up your environment

This app uses the latest stable version of Node. At the time of writing, the latest stable version is v18.18.0. It's recommended you use this version of Node to run the app. For information on installing Node, see [How to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs).

## Install dependencies

Ensure you're in the **nodejs/** folder, then install the necessary dependencies:

```bash
npm install
```

## Equip the app with credentials

Copy the included **.env.example** to a file called **.env**.

```bash
cp .env.example .env
```

Fill out the contents of the **.env** file with the [client ID and Sandbox secret in your Deck dashboard](https://app.deck.co). Don't place quotes (`"`) around the credentials (i.e., `DECK_CLIENT_ID=adn08a280hqdaj0ad`). Use the "Sandbox" secret when setting the `DECK_SECRET` variable.

![Credentials](https://i.imgur.com/CNpRnby.png)

# Start the server

```bash
npm start
```

The app will run on port http://127.0.0.1:8080

## Using the app

When connecting a utility provider, use the following sample credentials:

- Username: `user_good`
- Password: `pass_good`
