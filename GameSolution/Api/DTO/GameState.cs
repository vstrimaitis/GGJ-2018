using System.Collections.Generic;

namespace Web.DTO
{
    public class GameState
    {
        public string Message
        {
            get { return _message; }
            set
            {
                _message = value;
                LastPlayerIndex++;
            }
        }
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

        private string _message;
        private static int LastPlayerIndex;

        static GameState()
        {
            PlayerIds = new List<int>();
            LastPlayerIndex = 0;
        }
    }
}
