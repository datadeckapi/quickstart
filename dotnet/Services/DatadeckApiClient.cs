using Deck.Samples.Integration.DotNetCore.Models.DatadeckApi;
using RestSharp;

namespace Deck.Samples.Integration.DotNetCore.Services
{
    public class DatadeckApiClient
    {
        // "sandbox" could be replaced with "live" as required

        private string apiHost = "https://sandbox.datadeck.co/api/v1";

        // Change the values here
        // Do not expose these in your web application public code!

        private Guid clientId = new Guid("*** Use your client id here ***");
        private Guid secret = new Guid("*** Use your secret here ***");

        // Using RestSharp for communicating with Deck API

        private readonly RestClient client;

        public DatadeckApiClient()
        {
            client = new RestClient(apiHost);
        }

        public async Task<string> GetLinkToken()
        {
            var request = new RestRequest("link/token/create")
                .AddHeader("x-datadeck-client-id", clientId)
                .AddHeader("x-datadeck-secret", secret)
                ;

            var response = await client.PostAsync<LinkTokenCreateResponse>(request);
            return response!.link_token;
        }

        public async Task<string> ExchangePublicToken(string public_token)
        {
            var request = new RestRequest("connection/public_token/exchange")
                .AddHeader("x-datadeck-client-id", clientId)
                .AddHeader("x-datadeck-secret", secret)
                .AddBody(new { public_token }
                );

            var response = await client.PostAsync<ConnectionPublicTokenExchangeResponse>(request);
            return response!.access_token;
        }

        public async Task<string> GetProductEndpoint(string product, string access_token)
        {
            var request = new RestRequest(GetProductEndpoint(product))
                .AddHeader("x-datadeck-client-id", clientId)
                .AddHeader("x-datadeck-secret", secret)
                .AddBody(new { access_token }
                );

            var responseJson = await client.PostAsync(request);
            return responseJson.Content!;
        }

        private string GetProductEndpoint(string product)
        {
            if (product == "freelancer")
                return $"{product}/income_summary";
            else if (product == "employment")
                return $"{product}/salaried/get";
            else if (product == "sustainability")
                return $"{product}/consumption/invoices/get";
            else
                return $"{product}/get";
        }
    }
}