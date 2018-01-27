using DotNetify;
using System;
using Web.DTO;

namespace Web
{
    public class GameVM : BaseVM
    {
        private readonly IEventAggregator _eventAggregator; 

        private GameState _gamestate;                 
        public GameState GameState {
            get {
                
                return _gamestate;
            }
            set {                
                _eventAggregator.Publish(value);
            }
        }

        public PlayerState PlayerState { get; } = new PlayerState();

        public PlayerMove PlayerMove {
            set
            {

            }
        } 
      
        public GameVM(IEventAggregator eventAggregator, GameState gameState)
        {
            _eventAggregator = eventAggregator;
            _gamestate = gameState;

            PlayerState.Id = (new Random()).Next(1000000);
            Changed(nameof(PlayerState));
            PushUpdates();

            _eventAggregator.Subscribe<GameState>(x =>
            {
                _gamestate = x;
                Changed(nameof(GameState));
                PushUpdates(); 
            });
        }
    }   
}