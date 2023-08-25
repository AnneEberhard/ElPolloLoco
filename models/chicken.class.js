class Chicken extends MovableObject {
  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); //greift auf übergeordnete Klasse zu
  }
}
