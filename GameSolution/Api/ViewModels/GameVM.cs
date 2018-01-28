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
        private static readonly int MatchDuration = 60;
        private static readonly int TurnDuration = 15;
        private readonly IEventAggregator _eventAggregator;
        private static DateTime _gameStartedTime = DateTime.Now;
        private static DateTime _playerGameStartedTime = DateTime.Now; 

        public GameState GameState { get; set; }

        public PlayerState PlayerState { get; } = new PlayerState();

        public bool PlayerExited
        {
            set
            {
                var player = GameState.Players.Find(x => x.Id == PlayerState.Id);
                ResetPlayer(player);
                _eventAggregator.Publish<Player>(null); 
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
                _playerGameStartedTime = DateTime.Now; 
                _eventAggregator.Publish(value);
            }
        }

        private string _playerSubscription;
        private string _playerMoveSubscription; 
        private Timer _timer1;
        public int TimeLeft { get; private set; }
        public int CurrentPlayerTimeLeft { get; private set; }

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
                TimeLeft = MatchDuration - (DateTime.Now - _gameStartedTime).Seconds;
                CurrentPlayerTimeLeft = TurnDuration - (DateTime.Now - _playerGameStartedTime).Seconds;                 
                if (CurrentPlayerTimeLeft < 1 && GameState.NextPlayerId == PlayerState.Id)
                {
                    _playerGameStartedTime = DateTime.Now;
                    CurrentPlayerTimeLeft = TurnDuration;
                    GameState.LastPlayerId = PlayerState.Id;
                    _eventAggregator.Publish<Player>(null);
                }
                if (TimeLeft < 1)
                {
                    StopGame();                    
                }
                Changed(nameof(TimeLeft));
                Changed(nameof(CurrentPlayerTimeLeft));
                PushUpdates();
            }, null, 0, 1000);            
        }

        private void ResetGame()
        {            
            GameState.Players.ForEach(x => x.Score = 0); 
            GameState.LastPlayerId = GameState.Players.Count > 0 ? GameState.Players[0].Id : 0;
            GameState.GameEnded = false; 
            _gameStartedTime = DateTime.Now;
            _playerGameStartedTime = DateTime.Now;
            CurrentPlayerTimeLeft = TurnDuration; 
            _eventAggregator.Publish<Player>(null);
        }

        private void StopGame()
        {
            var players = GameState.Players;
            GameState = new GameState();
            GameState.Players = players;
            GameState.GameEnded = true; 
            GameState.LastPlayerId = -1;
            _eventAggregator.Publish<Player>(null);
        }

        public override void Dispose()
        {
            _timer1.Dispose();
            _eventAggregator.Unsubscribe(_playerSubscription);
            _eventAggregator.Unsubscribe(_playerMoveSubscription);
        }

        private void ResetPlayer(Player player)
        {
            if (player == null) return;
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