// The game grid, tiles with a 0 are empty
const grid = [[0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]]

window.onload = function() {
    createTile();
    createTile();
}

document.addEventListener("keyup", event => {
    moveTiles(event.key);
})

function createTile() {
    let row;
    let col;
    while (true) {
        // Repeats until an empty tile is found
        row = Math.floor((Math.random()*4));
        col = Math.floor((Math.random()*4));
        if (!grid[row][col]) {
            break;
        }
    }

    // Updates grid and displays new tile
    grid[row][col] = 2;
    const gridPosition = row * 4 + col + 1;
    const tile = document.querySelector(`.grid-tile:nth-child(${gridPosition})`);
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

function isTileFree(tile) {
    /* tile is an array structured as [row, col] */
    return grid[tile[0]][tile[1]] ? false : true;
}