export const getBoardDimensions = cells => ({
    rows: cells.map(c => c.coords.y).reduce((a, b) => Math.max(a, b), 0) + 1,
    cols: cells.map(c => c.coords.x).reduce((a, b) => Math.max(a, b), 0) + 1
});