namespace Web.DTO
{
    public class Cell
    {
        public Coordinate Coordinate { get; set; }
        public Influence Influence { get; set; }

        public Cell(Coordinate coordinate, Influence influence)
        {
            Coordinate = coordinate;
            Influence = influence;
        }
    }
}
