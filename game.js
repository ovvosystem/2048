// The game grid, tiles with a 0 are empty
let grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]]

window.onload = function() {
    resetGame()
}

document.addEventListener("keyup", event => {
    key = event.key
    if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
        moveTiles(key);
        createTile();
        updateDisplay();
    }
})

function createTile() {
    let row;
    let col;

    const freeTiles = []
    for (const row in grid) {
        for (const col in grid) {
            if (!grid[row][col]) freeTiles.push([+row, +col])
        }
    }

    if (!freeTiles.length) resetGame();

    const tile = freeTiles[Math.floor((Math.random()*freeTiles.length))];
    grid[tile[0]][tile[1]] = 2;
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
        case "4": {
            tile.style.background = "#F0DAC0";
            break;
        }
        case "8": {
            tile.style.background = "#F1E2B2";
            break;
        }
        case "16": {
            tile.style.background = "#F7E192";
            break;
        }
        case "32": {
            tile.style.background = "#FFD272";
            break;
        }
        case "64": {
            tile.style.background = "#F7B264";
            break;
        }
        case "128": {
            tile.style.background = "#F19E55";
            break;
        }
        case "256": {
            tile.style.background = "#EB7F51";
            break;
        }   
        case "512": {
            tile.style.background = "#E4584B";
            tile.style.color = "#eeeeee";
            break;
        }
        case "1024": {
            tile.style.background = "#D83644";
            tile.style.color = "#eeeeee";
            break;
        }
        case "2048": {
            tile.style.background = "#761396";
            tile.style.color = "#eeeeee";
            break;
        }
        default: {
            tile.style.background = "#444444";
            tile.style.color = "#eeeeee";
            break;
        }
    }
}

function isTileFree(tile) {
    /* tile is an array structured as [row, col] */
    return grid[tile[0]][tile[1]] ? false : true;
}

function isSameValue(tile1, tile2) {
    /* tiles are arrays structured as [row, col] */
    if (tile1.includes(4) || tile2.includes(4)) return false;
    if (tile1.includes(-1) || tile2.includes(-1)) return false;
    return grid[tile1[0]][tile1[1]] === grid[tile2[0]][tile2[1]];
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
                        // Merges if possible, else just moves
                        if (isSameValue(tile, [i-1, tile[1]])) mergeOnTile([i-1, tile[1]]);
                        else grid[i][tile[1]] = grid[tile[0]][tile[1]];

                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }

                // Still merges if possible when tiles are next to each other
                if (isSameValue(tile, [tile[0]-1, tile[1]])) {
                    mergeOnTile([tile[0]-1, tile[1]]);
                    grid[tile[0]][tile[1]] = 0;
                }
                                
            }
            break;
        }

        case "ArrowDown": {
            for (const tile of filledTiles.toReversed()) {
                // Check for furthest tile up that is free and moves filled tile there
                for (i = 3; i > tile[0]; i--) {
                    if (isTileFree([i, tile[1]])) {
                        // Merges if possible, else just moves
                        if (isSameValue(tile, [i+1, tile[1]])) mergeOnTile([i+1, tile[1]]);
                        else grid[i][tile[1]] = grid[tile[0]][tile[1]];

                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }

                // Still merges if possible when tiles are next to each other
                if (isSameValue(tile, [tile[0]+1, tile[1]])) {
                    mergeOnTile([tile[0]+1, tile[1]]);
                    grid[tile[0]][tile[1]] = 0;
                }
                
            }
            break;
        }

        case "ArrowLeft": {
            for (const tile of filledTiles) {
                // Check for furthest tile right that is free and moves filled tile there
                for (i = 0; i < tile[1]; i++) {
                    if (isTileFree([tile[0], i])) {
                        // Merges if possible, else just moves
                        if (isSameValue(tile, [tile[0], i-1])) mergeOnTile([tile[0], i-1]);
                        else grid[tile[0]][i] = grid[tile[0]][tile[1]];

                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }
                
                // Still merges if possible when tiles are next to each other
                if (isSameValue(tile, [tile[0], tile[1]-1])) {
                    mergeOnTile([tile[0], tile[1]-1]);
                    grid[tile[0]][tile[1]] = 0;
                }

            }
            break;
        }

        case "ArrowRight": {
            for (const tile of filledTiles.toReversed()) {
                // Check for furthest tile right that is free and moves filled tile there
                for (i = 3; i > tile[1]; i--) {
                    if (isTileFree([tile[0], i])) {
                        // Merges if possible, else just moves
                        if (isSameValue(tile, [tile[0], i+1])) mergeOnTile([tile[0], i+1]);
                        else grid[tile[0]][i] = grid[tile[0]][tile[1]];

                        grid[tile[0]][tile[1]] = 0;
                        break;
                    }
                }

                // Still merges if possible when tiles are next to each other
                if (isSameValue(tile, [tile[0], tile[1]+1])) {
                    mergeOnTile([tile[0], tile[1]+1]);
                    grid[tile[0]][tile[1]] = 0;
                }

            }
            break;
        }
    }
}

function mergeOnTile(tile) {
    /* tile is an array structured as [row, col] */
    grid[tile[0]][tile[1]] *= 2;
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

function resetGame() {
    grid = [[0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]]
    
    createTile();
    createTile();
    updateDisplay();
}