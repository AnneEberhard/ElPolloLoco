let intervallIDs = [];
let pause = false;
let isGameOver = false;

function setStoppableInterval(funktion, time) {
    let id = setInterval(funktion, time);
    intervallIDs.push(id);
  }