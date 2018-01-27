using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;

public interface IEventAggregator
{
    string Context { get; set; }

    string Subscribe<T>(Action<T> handler);
    void Unsubscribe(string subscriberKey);
    void Publish<T>(T message);
}

public class EventAggregator : IEventAggregator
{
    private static readonly AsyncLocal<string> _localContext = new AsyncLocal<string>();
    private ConcurrentDictionary<string, Delegate> _subscribers = new ConcurrentDictionary<string, Delegate>();
    private int _subscriberIdxCounter = 0;

    public string Context
    {
        get => _localContext.Value;
        set => _localContext.Value = value;
    }

    public void Publish<T>(T message)
    {
        _subscribers.Where(kvp => kvp.Key.EndsWith(typeof(T).Name))
           .Select(kvp => kvp.Value)
           .ToList()
           .ForEach(handler => handler.DynamicInvoke(new object[] { message }));
    }

    public string Subscribe<T>(Action<T> handler)
    {
        string subscriberKey = $"{Context}.{Interlocked.Increment(ref _subscriberIdxCounter)}.{typeof(T)}";
        _subscribers.TryAdd(subscriberKey, handler);
        return subscriberKey;
    }

    public void Unsubscribe(string subscriberKey) => _subscribers.TryRemove(subscriberKey, out Delegate value);
}