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
            ////////////////////////////////////// EDGES 
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


            ////////////////////////////////////////// CELLS 
            Cells = new List<Cell>();
            for (var i = 0; i < rows; i++)
            {
                for (var j = 0; j < cols; j++)
                {
                    Cells.Add(new Cell(new Coordinate(i, j), new List<Influence>())); 
                }
            }
        }

        static GameState()
        {
            PlayerIds = new List<int>();
            LastPlayerIndex = 0;
        }

        internal void SetMove(PlayerMove move, int playerId)
        {
            //Update Edges 
            Edges.RemoveAll(x => x.StartCoordinate == move.StartCoordinate && x.EndCoordinate == move.EndCoordinate);
            Edges.Add(new Edge(new Coordinate(move.StartCoordinate.X, move.StartCoordinate.Y), new Coordinate(move.EndCoordinate.X, move.EndCoordinate.Y), playerId));

            //Update Cells 
            //TODO 
        }
    }
}
