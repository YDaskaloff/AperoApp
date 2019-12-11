using Microsoft.AspNetCore.Http;


namespace AperoApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static string Capitalize(string someString) {
            var firstChar = someString[0];
            firstChar.ToString().ToUpper();

            return firstChar + someString.Substring(1);
        }
    }
}