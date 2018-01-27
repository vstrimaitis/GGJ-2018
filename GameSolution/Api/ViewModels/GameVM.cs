using DotNetify;
using System;
using Web.DTO;

namespace Web
{
    public class GameVM : BaseVM
    {
        private readonly IEventAggregator _eventAggregator; 
              
        public GameState GameState { get; }

        public PlayerState PlayerState { get; } = new PlayerState();

        public PlayerMove PlayerMove {
            set
            {
                GameState.LastPlayerIndex++;
                _eventAggregator.Publish(value);
            }
        }

        private static bool fakeUserPassed = false; 
      
        public GameVM(IEventAggregator eventAggregator, GameState gameState)
        {
            _eventAggregator = eventAggregator;
            GameState = gameState;

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

            _eventAggregator.Subscribe<PlayerMove>(x =>
            {                
                GameState.SetMessage(x.Message);
                Changed(nameof(GameState));
                PushUpdates(); 
            });
        }
    }   
}