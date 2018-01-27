using DotNetify;
using System;
using System.Diagnostics;
using System.Threading;
using Web.DTO;

namespace Web
{
    public class GameVM : BaseVM
    {
        private readonly IEventAggregator _eventAggregator;
        private static DateTime _gameStartedTime = DateTime.Now; 

        public GameState GameState { get; set; }

        public PlayerState PlayerState { get; } = new PlayerState();

        public bool PlayerExited
        {
            set
            {
                var player = GameState.Players.Find(x => x.Id == PlayerState.Id);
                GameState.Players.Remove(player);
                Player.Colors.Add(player.Color);
                //GameState.LastPlayerIndex; 

                Dispose(); 
            }
        }

        public PlayerMove PlayerMove
        {
            set
            {
                GameState.Message = value.Message;
                GameState.SetMove(value, PlayerState.Id);
                _eventAggregator.Publish(value);
            }
        }

        private Timer _timer1;
        public int TimeLeft { get; set; }

        public GameVM(IEventAggregator eventAggregator, GameState gameState)
        {
            _eventAggregator = eventAggregator;
            GameState = gameState;

            _eventAggregator.Subscribe<Player>(x =>
            {                
                Changed(nameof(GameState));
                PushUpdates();
            });

            _eventAggregator.Subscribe<PlayerMove>(x =>
            {
                
                //GameState.Message = x.Message;
                Changed(nameof(GameState));
                PushUpdates();
            });

            PlayerState.Id = (new Random()).Next(1000000);
            Changed(nameof(PlayerState));
            GameState.Players.Add(new Player(PlayerState.Id));
            _eventAggregator.Publish(new Player(PlayerState.Id));
            PushUpdates();

            _timer1 = new Timer(state =>
            {
                TimeLeft = 20 - (DateTime.Now - _gameStartedTime).Seconds; 
                Changed(nameof(TimeLeft));
                if (TimeLeft <= 1)
                {
                    //ResetGame();                    
                }
                PushUpdates();
            }, null, 0, 1000);            
        }

        private void ResetGame()
        {           
            GameState = new GameState();
            Changed(nameof(GameState));
            _gameStartedTime = DateTime.Now;
        }

        public override void Dispose()
        {
            _timer1.Dispose();
        }
    }
}