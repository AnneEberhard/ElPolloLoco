class Chicken extends MovableObject {
  height = 80; //hier ohne this, unten mit
  width = 80;
  y = 340;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); //greift auf übergeordnete Klasse zu
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300+ Math.random()*500;
    this.speed = 0.15 + Math.random()*0.25;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length; // modulo (%) gibt den Rest raus, also z.B. 7 % 6 = 1
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }
}
