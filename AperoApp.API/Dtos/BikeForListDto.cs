namespace AperoApp.API.Dtos
{
    public class BikeForListDto
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Name { get; set; }
        public int Gears { get; set; }
        public string Color { get; set; }
        public int WheelSize { get; set; }
        public int Weight { get; set; }
        public string Type { get; set; }
        public string PhotoUrl { get; set; }
    }
}