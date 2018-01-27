using System.Collections.Generic;
using System.Linq;

namespace Web.DTO
{
    public class GameState
    {
        public string Message { get; internal set; }
        public List<Edge> Edges { get; set; }
        public List<Cell> Cells { get; set; }

        public static List<int> PlayerIds { get; set; }
        public int NextPlayerId
        {
            get
            {
                if (PlayerIds == null || PlayerIds.Count == 0)
                {
                    return -1;
                }
                int nextIndex = LastPlayerIndex % PlayerIds.Count;
                return PlayerIds[nextIndex];
            }
        }

        internal static int LastPlayerIndex { get; set; }
        public GameState()
        {
            Edges = new List<Edge>();
            int rows = 12;
            int cols = 10;
            // Horizontal edges
            for (var i = 0; i < rows + 1; i++)
            {
                for (var j = 0; j < cols; j++)
                {
                    Edges.Add(new Edge(new Coordinate(j, i), new Coordinate(j + 1, i), -1));
                }
            }

            // Vertical edges
            for (var i = 0; i < rows; i++)
            {
                for (var j = 0; j < cols + 1; j++)
                {
                    Edges.Add(new Edge(new Coordinate(j, i), new Coordinate(j, i + 1), -1));
                }
            }

            Cells = new List<Cell>();
        }

        static GameState()
        {
            PlayerIds = new List<int>();
            LastPlayerIndex = 0;
        }

        internal void SetMove(PlayerMove move, int playerId)
        {
            Edges.RemoveAll(x => x.StartCoordinate.X == move.StartCoordinate.X && x.StartCoordinate.Y == move.StartCoordinate.Y
                && x.EndCoordinate.X == move.EndCoordinate.X && x.EndCoordinate.Y == move.EndCoordinate.Y);
            Edges.Add(new Edge(new Coordinate(move.StartCoordinate.X, move.StartCoordinate.Y), new Coordinate(move.EndCoordinate.X, move.EndCoordinate.Y), playerId));
        }
    }
}
