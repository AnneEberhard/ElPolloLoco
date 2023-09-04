class Character extends MovableObject {
  x = 100;
  y = 120;
  height = 300;
  width = 150;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  world;
  speed = 5;
  walking_sound = new Audio("audio/running.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); //greift auf übergeordnete Klasse zu
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.moveCharacter();
    this.moveCharacterImages();
  }

  moveCharacter() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.walkRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.walkLeft();
      }
      this.world.camera_x = -this.x + 100;
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
    }, 1000 / 60);
  }

  moveCharacterImages() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

walkLeft() {
  this.moveLeft();
  this.otherDirection = true;
  this.walking_sound.play();
}

walkRight() {
  this.moveRight();
  this.otherDirection = false;
  this.walking_sound.play();
}

}
