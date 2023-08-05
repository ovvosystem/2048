// The game grid, tiles with a 0 are empty
const grid = [[0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]]

window.onload = function() {
    createTile();
    createTile();
    updateDisplay();
}

document.addEventListener("keyup", event => {
    moveTiles(event.key);
    updateDisplay();
})

function createTile() {
    let row;
    let col;
    while (true) {
        // Repeats until a free tile is found, then fills it
        row = Math.floor((Math.random()*4));
        col = Math.floor((Math.random()*4));
        if (!grid[row][col]) {
            grid[row][col] = 2;
            break;
        }
    }
}

function styleTile(tile) {
    switch (tile.textContent) {
        case "": {
            tile.style.background = "#C4B8AF";
            break;
        }
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

function updateDisplay() {
    for (const row in grid) {
        for (const col in grid) {
            const gridPosition = +row * 4 + +col + 1;
            const tile = document.querySelector(`.grid-tile:nth-child(${gridPosition})`);

            if (grid[row][col] === 0) tile.children[0].textContent = "";
            else tile.children[0].textContent = grid[row][col];

            styleTile(tile);
        }
    }
}