export const mapGameState = (gs) => {
    return {
        players: gs.Players.map(mapPlayer),
        cells: gs.Cells.map(mapCell),
        edges: gs.Edges.map(mapEdge)
    };
};

const mapPlayer = p => ({
    id: p.Id,
    score: p.Score,
    color: p.Color
});

const mapCoordinate = c => ({x: c.X, y: c.Y});

const mapInfluence = i => !i ? null : ({playerId: i.PlayerId, amount: i.Level});

const mapCell = c => ({
    coords: mapCoordinate(c.Coordinate),
    influence : mapInfluence(c.Influence)
});

const mapEdge = e => ({
    start: mapCoordinate(e.StartCoordinate),
    end: mapCoordinate(e.EndCoordinate),
    owner: e.PlayerId
});