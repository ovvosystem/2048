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
        row = Math.floor((Math.random()*4));
        col = Math.floor((Math.random()*4));
        if (!grid[row][col]) {
            grid[row][col] = 1;
            break;
        }
    }

    const tile = document.querySelector(`.grid-tile:nth-child(${row * 4 + col + 1})`);
    tile.textContent = "2";
}