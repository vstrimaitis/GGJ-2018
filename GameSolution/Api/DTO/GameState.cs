using System.Collections.Generic;

namespace Web.DTO
{
    public class GameState
    {
        public string Message { get; internal set; }

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

        static GameState()
        {
            PlayerIds = new List<int>();
            LastPlayerIndex = 0;
        }

        internal void SetMessage(string message)
        {
            Message = message; 
        }
    }
}
