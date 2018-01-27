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

        private static bool fakeUserPassed = false; 
      
        public GameVM(IEventAggregator eventAggregator, GameState gameState)
        {
            _eventAggregator = eventAggregator;
            _gamestate = gameState;

            if (!fakeUserPassed)
            {
                fakeUserPassed = true;
                return;
            }
                        
            PlayerState.Id = (new Random()).Next(1000000);
            Changed(nameof(PlayerState));
            GameState.PlayerIds.Add(PlayerState.Id);
            Changed(nameof(GameState));
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