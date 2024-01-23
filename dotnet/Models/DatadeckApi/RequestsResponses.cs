namespace Datadeck.Samples.Integration.DotNetCore.Models.DatadeckApi
{
    public record LinkTokenCreateResponse
    {
        public string link_token { get; set; } = null!;
    }

    public record ConnectionPublicTokenExchangeResponse
    {
        public string access_token { get; set; } = null!;
        public Guid connection_id { get; set; }
    }
}