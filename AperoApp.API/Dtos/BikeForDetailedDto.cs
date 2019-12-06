using System;
using System.Collections.Generic;
using AperoApp.API.Models;

namespace AperoApp.API.Dtos
{
    public class BikeForDetailedDto
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
        public bool Basket { get; set; }
        public string Description { get; set; }
        public string Sex { get; set; }
        public int BikerHeight { get; set; }
        public ICollection<PhotoForDetailedDto> Photos { get; set; }
        public DateTime DateAdded { get; set; }
        public string GearType { get; set; }
        public string BreakType { get; set; }
        public bool LuggageRack { get; set; }
        public string PhotoUrl { get; set; }
    }
}