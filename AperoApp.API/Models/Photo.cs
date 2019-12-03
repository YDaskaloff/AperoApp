namespace AperoApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public bool IsMain { get; set; }
        public Bike Bike { get; set; }
        public int BikeId { get; set; }
    }
}