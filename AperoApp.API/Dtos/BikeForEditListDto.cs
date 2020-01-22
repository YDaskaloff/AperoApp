using System;

namespace AperoApp.API.Dtos
{
    public class BikeForEditListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateAdded { get; set; }
    }
}