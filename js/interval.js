let intervallIDs = [];
let pause = false; //global variable needed early in the game
let isGameOver = false; //global variable needed early in the game

/**
 * This function is the default function for stoppable Intervals used in the game
 * @param {fn} = function that is set in the interval
 * * @param {number} = frequency
 */
function setStoppableInterval(funktion, time) {
    let id = setInterval(funktion, time);
    intervallIDs.push(id);
  }
