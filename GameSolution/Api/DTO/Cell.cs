using System.Collections.Generic;

namespace Web.DTO
{
    public class Cell
    {
        public Coordinate Coordinate { get; set; }
        public List<Influence> Influences { get; set; }
    }
}
