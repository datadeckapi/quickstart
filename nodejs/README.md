# Datadeck Quickstart (NodeJS)

This is a minimal app that implements Datadeck using a very basic HTML/vanilla JS frontend with an Express/Node backend. After linking a sample utility account, the app retrieves information associated with the account and renders it on the home page.

![Screenshot of the app](https://i.imgur.com/UBDKovj.png)

# Running the app

## Set up your environment

This app uses the latest stable version of Node. At the time of writing, the latest stable version is v18.18.0. It's recommended you use this version of Node to run the app. For information on installing Node, see [How to install Node.js](https://nodejs.dev/learn/how-to-install-nodejs).

## Install dependencies

Ensure you're in the **vanilla_js/** folder, then install the necessary dependencies:

```bash
npm install
```

## Equip the app with credentials

Copy the included **.env.example** to a file called **.env**.

```bash
cp .env.example .env
```

Fill out the contents of the **.env** file with the [client ID and Sandbox secret in your Datadeck dashboard](https://app.datadeck.co). Don't place quotes (`"`) around the credentials (i.e., `DATADECK_CLIENT_ID=adn08a280hqdaj0ad`). Use the "Sandbox" secret when setting the `DATADECK_SECRET` variable.

# Start the server

```bash
yarn start
```

The app will run on port 8080.

## Using the app

When connecting a utility provider, use the following sample credentials:

- Username: `user_good`
- Password: `pass_good`
