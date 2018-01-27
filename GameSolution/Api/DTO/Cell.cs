using System.Collections.Generic;

namespace Web.DTO
{
    public class Cell
    {
        public Coordinate Coordinate { get; set; }
        public List<Influence> Influences { get; set; }

        public Cell(Coordinate coordinate, List<Influence> influences)
        {
            Coordinate = coordinate;
            Influences = influences;
        }
    }
}
