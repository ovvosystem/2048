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

function moveTiles(direction) {
    // Checks for all filled tiles
    const filledTiles = []
    for (const row in grid) {
        for (const col in grid) {
            if (grid[row][col]) filledTiles.push([+row, +col])
        }
    }

    // Moves filled tiles in the desired direction
    switch (direction) {
        case "ArrowUp": {
            for (const tile of filledTiles) {
                // Check for furthest tile up that is free and moves filled tile there
                for (i = 0; i < tile[0]; i++) {
                    if (isTileFree([i, tile[1]])) {
                        grid[i][tile[1]] = grid[tile[0]][tile[1]]
                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }
            }
            break;
        }

        case "ArrowDown": {
            for (const tile of filledTiles.toReversed()) {
                // Check for furthest tile up that is free and moves filled tile there
                for (i = 3; i > tile[0]; i--) {
                    if (isTileFree([i, tile[1]])) {
                        grid[i][tile[1]] = grid[tile[0]][tile[1]]
                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }
            }
            break;
        }

        case "ArrowLeft": {
            for (const tile of filledTiles) {
                // Check for furthest tile right that is free and moves filled tile there
                for (i = 0; i < tile[1]; i++) {
                    if (isTileFree([tile[0], i])) {
                        grid[tile[0]][i] = grid[tile[0]][tile[1]]
                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }
            }
            break;
        }

        case "ArrowRight": {
            for (const tile of filledTiles.toReversed()) {
                // Check for furthest tile right that is free and moves filled tile there
                for (i = 3; i > tile[1]; i--) {
                    if (isTileFree([tile[0], i])) {
                        grid[tile[0]][i] = grid[tile[0]][tile[1]]
                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }
            }
            break;
        }
    }
}