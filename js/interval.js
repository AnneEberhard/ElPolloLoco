let intervallIDs = [];

function setStoppableInterval(funktion, time) {
    let id = setInterval(funktion, time);
    intervallIDs.push(id);
  }