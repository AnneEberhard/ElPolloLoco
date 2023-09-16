class ChickenSmall extends Chicken {
  height = 60;
  width = 60;
  y = 360;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  chicken_sound = new Audio("audio/chickenBwak.mp3");

  constructor() {
    super().loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD);
    this.x = 300 + Math.random() * 1000;
    this.speed = 0.2 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * This function starts animation for the small chickens with a stoppable interval
   * @param {*}  = no param
   */
  animate() {
    setStoppableInterval(this.chickenMoving.bind(this), 1000 / 60);
    setStoppableInterval(this.chickenImages.bind(this), 100);
  }
}
