class Character extends MovableObject {
  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); //greift auf übergeordnete Klasse zu
  }

  jump() {
    console.log("jump");
  }
}
