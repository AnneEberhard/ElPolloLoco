class Chicken extends MovableObject {
  height = 80; //hier ohne this, unten mit
  width = 80;
  y = 340;

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); //greift auf übergeordnete Klasse zu
    this.x = 200+ Math.random()*500;

  }
}
