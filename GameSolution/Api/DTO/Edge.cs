namespace Web.DTO
{
    public class Edge
    {
        public Coordinate StartCoordinate { get; set; }
        public Coordinate EndCoordinate { get; set; }
        public int PlayerId { get; set; }

        public Edge(Coordinate startCoordinate, Coordinate endCoordinate, int playerId)
        {
            StartCoordinate = startCoordinate;
            EndCoordinate = endCoordinate;
            PlayerId = playerId;
        }
    }
}
