using DotNetify;
using System;
using System.Diagnostics;
using System.Linq;
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
                ResetPlayer(player);

                // should we add event aggregator message here? 

                Dispose(); 
            }
        }

        public PlayerMove PlayerMove
        {
            set
            {
                if(GameState.NextPlayerId != PlayerState.Id)
                {
                    return;
                }
                GameState.Message = value.Message;
                GameState.SetMove(value, PlayerState.Id);
                _eventAggregator.Publish(value);
            }
        }

        private string _playerSubscription;
        private string _playerMoveSubscription; 
        private Timer _timer1;
        public int TimeLeft { get; set; }

        public GameVM(IEventAggregator eventAggregator, GameState gameState)
        {
            _eventAggregator = eventAggregator;
            GameState = gameState;

            _playerSubscription = _eventAggregator.Subscribe<Player>(x =>
            {                
                Changed(nameof(GameState));
                PushUpdates();
            });

            _playerMoveSubscription = _eventAggregator.Subscribe<PlayerMove>(x =>
            {
                
                //GameState.Message = x.Message;
                Changed(nameof(GameState));
                PushUpdates();
            });

            PlayerState.Id = (new Random()).Next(1000000);
            Changed(nameof(PlayerState));
            var player = new Player(PlayerState.Id);
            GameState.Players.Add(player);
            _eventAggregator.Publish(player);
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
            _eventAggregator.Unsubscribe(_playerSubscription);
            _eventAggregator.Unsubscribe(_playerMoveSubscription);
        }

        private void ResetPlayer(Player player)
        {
            int playerId = player.Id;
            GameState.Cells = GameState.Cells
                                       .Select(x => x.Influence?.PlayerId == playerId ? new Cell(x.Coordinate, null) : x)
                                       .ToList();
            GameState.Edges = GameState.Edges
                                       .Select(x => x.PlayerId == playerId ? new Edge(x.StartCoordinate, x.EndCoordinate, -1) : x)
                                       .ToList();
            GameState.Players.Remove(player);
            Player.Colors.Add(player.Color);
        }
    }
}