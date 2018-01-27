namespace Web.DTO
{
    public class Influence
    {
        public int PlayerId { get; set; }
        public int Level { get; set; }

        public Influence(int playerId, int level)
        {
            PlayerId = playerId;
            Level = level; 
        }
    }
}
