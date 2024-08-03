using Deck.Samples.Integration.DotNetCore.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Deck.Samples.Integration.DotNetCore.Pages
{
    public class ConnectModel : PageModel
    {
        // Link token that will be used in the URL of the iframe for the Link session
        public string DatadeckLinkToken { get; private set; } = null!;

        private readonly DatadeckApiClient datadeckApiClient;

        public ConnectModel()
        {
            datadeckApiClient = new DatadeckApiClient();
        }

        public async Task OnGet()
        {
            // Get a link token and make it available in the web page model
            DatadeckLinkToken = await datadeckApiClient.GetLinkToken();
        }

        public async Task OnPost([FromForm] string public_token)
        {
            // Exchange the public token from the Link iframe for an access token
            var accessToken = await datadeckApiClient.ExchangePublicToken(public_token);

            // Store the access token with care, this is your master key to the data collected from the user credentials
            Console.WriteLine($"Your access token is \"{accessToken}\"");
        }
    }
}