class ChickenNormal extends Chicken {
  height = 80;
  width = 80;
  y = 340;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];
  chicken_sound = new Audio("audio/chickenShort.mp3");

  constructor() {
    super().loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 300 + Math.random() * 1000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * This function starts animation for the Normal chickens with a stoppable interval
   * @param {*}  = no param
   */
  animate() {
    setStoppableInterval(this.chickenMoving.bind(this), 1000 / 60);
    setStoppableInterval(this.chickenImages.bind(this), 100);
  }
}
