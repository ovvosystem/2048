// The game grid, tiles with a 0 are empty while tiles with a 1 are occupied
const grid = [[0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]]

window.onload = function() {
    createTile();
    createTile();
}

function createTile() {
    let row;
    let col;
    while (true) {
        // Repeats until an empty tile is found, then marks it as filled
        row = Math.floor((Math.random()*4));
        col = Math.floor((Math.random()*4));
        if (!grid[row][col]) {
            grid[row][col] = 1;
            break;
        }
    }

    // Display new tile
    const tile = document.querySelector(`.grid-tile:nth-child(${row * 4 + col + 1})`);
    tile.children[0].textContent = "2";
    styleTile(tile);
}

function styleTile(tile) {
    switch (tile.textContent) {
        case "2": {
            tile.style.background = "#EEE0D8";
            break;
        }
    }
}