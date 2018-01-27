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
        private static DateTime _playerGameStartedTime = DateTime.Now; 

        public GameState GameState { get; set; }

        public PlayerState PlayerState { get; } = new PlayerState();

        public bool PlayerExited
        {
            set
            {
                var player = GameState.Players.Find(x => x.Id == PlayerState.Id);
                GameState.Players.Remove(player);
                Player.Colors.Add(player.Color);

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
                TimeLeft = 60 - (DateTime.Now - _gameStartedTime).Seconds;
                CurrentPlayerTimeLeft = 15 - (DateTime.Now - _playerGameStartedTime).Seconds;                 
                if (CurrentPlayerTimeLeft <= 1 && GameState.NextPlayerId == PlayerState.Id)
                {
                    _playerGameStartedTime = DateTime.Now;
                    CurrentPlayerTimeLeft = 15;
                    GameState.LastPlayerId = PlayerState.Id;
                    _eventAggregator.Publish<Player>(null);
                }
                if (TimeLeft <= 1)
                {
                    ResetGame();                    
                }
                Changed(nameof(TimeLeft));
                Changed(nameof(CurrentPlayerTimeLeft));
                PushUpdates();
            }, null, 0, 1000);            
        }

        private void ResetGame()
        {
            var players = GameState.Players; 
            GameState = new GameState();
            GameState.Players = players;
            //GameState.LastPlayerId = GameState.Players.Count > 0 ? GameState.Players[0].Id : 0; 
            _gameStartedTime = DateTime.Now;
            _playerGameStartedTime = DateTime.Now;
            _eventAggregator.Publish<Player>(null);
        }

        public override void Dispose()
        {
            _timer1.Dispose();
            _eventAggregator.Unsubscribe(_playerSubscription);
            _eventAggregator.Unsubscribe(_playerMoveSubscription);
        }
    }
}