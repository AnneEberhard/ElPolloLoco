class Chicken extends MovableObject {
  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); //greift auf übergeordnete Klasse zu
    this.x = 200+ Math.random()*500;
    this.y = 300;
    this.height = 50;
    this.width = 50;
  }
}
