# [Deck](https://deck.co) quickstart (C# dotnet)
This repository contains a basic example of a website integration with Deck API and Deck Link.

You will see how to:
* Use the Link SDK for embedding the Link widget within a website.
* Communicate with the Deck API from a backend.
* Exchange data between the Link widget iframe, website frontend and backend.
* Obtain a Link token to initialize a Link session.
* Connect account data by completing a Link session.
* Exchange the public token obtained at the end of the Link session for an access token.
* Use the access token to retrieve the account data collected.

## 1. Clone the repository
Clone the repository or download the code to your local workstation.

## 2. Set up your environment
You need to replace the values in the `DatadeckApiClient.cs` file with your own. We recommend using  your client id and **sandbox secret** to start with. For using a live secret, you will have to update the API host also. Get your client id and secrets from the [dashboard](https://app.datadeck.co/api-keys).

    private Guid clientId = new Guid("*** Use your client id here ***");
    private Guid secret = new Guid("*** Use your secret here ***");

## 3. Run the project
You can run the project in different ways, we recommend opening the solution file (`.sln`) with Visual Studio or opening the code folder in Visual Studio Code.

Once the web application is started, you can browse to `https://localhost:7067` to get on the Home page of the sample website.

By browsing to `https://localhost:7067/Connect` or clicking on the "Connect" hyperlink in the top bar, you will land on the web page that integrates the Link widget and a Link session will be initialized. If you get an error message, it means that you did not set up your client id and secret correctly in the backend.

![Deck sample - Connect page](https://images.cdn.datadeck.co/samples/dotnet/connect.png)

After completing the Link session (choosing a data source, inputting credentials and clicking the final OK button), the backend will get the access token associated to this connection and print it in the console window of the web application, e.g.:

    Your access token is "access-sandbox-208a867a-5acb-4d0e-cbb8-08dc0e2d7839"

The access token is used for retrieving the data collected with the provided credentials. Printing it to the console is only provided as a simple example, you should always handle an access token with care and store it securely! It is the master key for accessing the collected account data.

There is a page available on the sample website for showing how you can use the access token to view account data obtained from the connection.

![Deck sample - View data](https://images.cdn.datadeck.co/samples/dotnet/data.png)

## 4. Digging into the code

### DatadeckApiClient.cs
This is the backend service for communicating with the Deck API. You should be using the client id associated to the *Team* you want to collect credentials for. You should also be using the secret corresponding to the Datadeck environment you want to work on (sandbox, development or production).

Keep in mind: Requests that are using your client id and secret must be made exclusively from the backend and not directly from the frontend, in order to not expose your sensitive keys publicly.

### Connect.cshtml
This frontend web page shows how to integrate the Link SDK in order to use the Deck Link widget. First, the Link SDK script is added:

    <script src="https://link.datadeck.co/link-initialize.js"></script>
    
Then custom functions are created for:
* Obtaining a link token from the backend.
* Launching the Link widget by calling `Deck.create` with the link token.
* Passing the public token returned by the Link iframe at the end of the Link session to your backend, using the onSuccess event handler.

### Connect.cshtml.cs

The backend is used for communicating with the Deck API at two important moments:
* To initialize the Link session and obtain the link token to pass to the frontend.
* To exchange the public token obtained at the end of the Link session for an access token.

### Data.cshtml.cs

The backend for this page simply shows how to use an access token in order to retrieve account data collected from a connection made through a Link session.
