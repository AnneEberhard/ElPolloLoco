class ThrowableObject extends MovableObject {
  height = 80;
  width = 80;
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  otherDirection;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  constructor(x, y, otherDirection) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setStoppableInterval(this.bottleImages.bind(this), 30);
  }

  bottleImages() {
    if (this.otherDirection) {
      this.x -= 10;
    } else {
      this.x += 10;
    }
    this.playAnimationOnLoop(this.IMAGES_ROTATION);
  }
}
