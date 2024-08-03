using Deck.Samples.Integration.DotNetCore.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Deck.Samples.Integration.DotNetCore.Pages
{
    public class DataModel : PageModel
    {
        private readonly DatadeckApiClient datadeckApiClient;

        public string JsonResponse { get; private set; } = null!;

        [BindProperty]
        public string AccessToken { get; set; } = null!;

        [BindProperty]
        public string Product { get; set; } = null!;

        public DataModel()
        {
            datadeckApiClient = new DatadeckApiClient();
        }

        public void OnGet()
        {
        }

        public async Task OnPost()
        {
            try
            {
                if (string.IsNullOrEmpty(AccessToken) == false)
                    JsonResponse = await datadeckApiClient.GetProductEndpoint(Product, AccessToken);
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("Invalid access token");
            }
        }
    }
}