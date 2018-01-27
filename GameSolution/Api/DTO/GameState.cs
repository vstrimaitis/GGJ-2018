using System;
using System.Collections.Generic;
using System.Linq;

namespace Web.DTO
{
    public class GameState
    {
        private static List<int> _influences = new List<int>() { 100, 50, 25 };

        public string Message { get; internal set; }
        public List<Edge> Edges { get; set; }
        public List<Cell> Cells { get; set; }

        public List<Player> Players { get; set; }
        public int NextPlayerId
        {
            get
            {                
                if (Players == null || Players.Count == 0)
                {
                    return -1;
                }
                var lastPlayerIndex = Players.FindIndex(x => x.Id == LastPlayerId);
                var nextPlayerIndex = lastPlayerIndex != Players.Count - 1 ? lastPlayerIndex + 1 : 0;
                return Players[nextPlayerIndex].Id;
            }
        }

        internal int LastPlayerId { get; set; }
        public GameState()
        {
            Players = new List<Player>();

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
                    Cells.Add(new Cell(new Coordinate(j, i), null)); 
                }
            }
        }

        internal void SetMove(PlayerMove move, int playerId)
        {
            LastPlayerId = playerId; 

            //Update Edges 
            Edges.RemoveAll(x => x.StartCoordinate.Equals(move.StartCoordinate) && x.EndCoordinate.Equals(move.EndCoordinate));
            Edges.Add(new Edge(new Coordinate(move.StartCoordinate.X, move.StartCoordinate.Y), new Coordinate(move.EndCoordinate.X, move.EndCoordinate.Y), playerId));

            //Update Cells 
            UpdateCells(move, playerId);
            UpdateScore();
        }

        private void UpdateScore()
        {
            var scores = Cells.GroupBy(x => x.Influence?.PlayerId)
                              .Where(x => x.Key != null)
                              .ToDictionary(x => x.Key, x => x.Count());
            Players = Players.Select(x => new Player(x.Id, scores[x.Id], x.Color)).ToList();

        }

        private void UpdateCells(PlayerMove move, int playerId)
        {
            if(move.StartCoordinate.X == move.EndCoordinate.X)
            {
                // Vertical edge
                for(int i = 0; i < _influences.Count; i++)
                {
                    var toReplace = Cells.Where(x => x.Coordinate.Y == move.StartCoordinate.Y)
                                         .Where(x => x.Coordinate.X == move.StartCoordinate.X - i-1 || x.Coordinate.X == move.StartCoordinate.X+i)
                                         .Where(x => x.Influence == null || x.Influence.Level < _influences[i])
                                         .ToList();
                    foreach (var c in toReplace)
                    {
                        Cells.RemoveAll(x => x.Coordinate.Equals(c.Coordinate));
                        Cells.Add(new Cell(c.Coordinate, new Influence(playerId, _influences[i])));
                    }
                }
            } else
            {
                // Horizontal edge
                for (int i = 0; i < _influences.Count; i++)
                {
                    var toReplace = Cells.Where(x => x.Coordinate.X == move.StartCoordinate.X)
                                         .Where(x => x.Coordinate.Y == move.StartCoordinate.Y - i-1 || x.Coordinate.Y == move.StartCoordinate.Y+i)
                                         .Where(x => x.Influence == null || x.Influence.Level < _influences[i])
                                         .ToList();
                    foreach (var c in toReplace)
                    {
                        Cells.RemoveAll(x => x.Coordinate.Equals(c.Coordinate));
                        Cells.Add(new Cell(c.Coordinate, new Influence(playerId, _influences[i])));
                    }
                }
            }
        }
    }
}
