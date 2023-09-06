class Chicken extends MovableObject {
  height = 80; //hier ohne this, unten mit
  width = 80;
  y = 340;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  chicken_sound = new Audio('audio/chicken.mp3');

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); //greift auf übergeordnete Klasse zu
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300+ Math.random()*1000;
    this.speed = 0.15 + Math.random()*0.25;
    this.animate();
  }
 
  animate() {
    setInterval( () => {
      this.moveLeft();
    }, 1000 / 60)
    this.chicken_sound.pause();
    setInterval(() => {
      this.playAnimationOnLoop(this.IMAGES_WALKING);
      //this.chicken_sound.play();
    }, 100);
  }
}
