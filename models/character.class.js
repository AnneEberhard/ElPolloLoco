class Character extends MovableObject {
  x = 100;
  y = 120;
  height = 300;
  width = 150;
  energy = 100;
  speed = 7;
  actionTime;
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
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
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  world;
  coinsCollected = 0;
  bottlesCollected = 0;

  offset = {
    top: 100,
    right: 40,
    bottom: 0,
    left: 40,
  };

  walking_sound = new Audio("audio/running.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  hurting_sound = new Audio("audio/ow.mp3");
  dying_sound = new Audio("audio/dying.mp3");
  snoring_sound = new Audio("audio/snore.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  /**
   * This function starts animation for the character with a stoppable interval
   * @param {*}  = no param
   */
  animate() {
    setStoppableInterval(this.moveCharacter.bind(this), 1000 / 60);
    setStoppableInterval(this.playCharacterSounds.bind(this), 100);
    setStoppableInterval(this.moveCharacterImages.bind(this), 100);
  }

  /**
   * This function moves character according to input
   * @param {*}  = no param
   */
  moveCharacter() {
    if (this.gameIsRunning()) {
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
    }
  }

  /**
   * This function plays character images according to input
   * @param {*}  = no param
   */
  moveCharacterImages() {
    if (this.gameIsRunning()) {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        world.gameOver(0);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        } else if (this.timeCharacterMoved() < 5) {
          this.playAnimation(this.IMAGES_IDLE);
        } else {
          this.playAnimation(this.IMAGES_LONG_IDLE);
        }
      }
    }
  }

  /**
   * This function plays character sounds according to input
   * @param {*}  = no param
   */
  playCharacterSounds() {
    if (this.gameIsRunning()) {
      if (this.isDead()) {
        this.playSound(this.dying_sound);
      } else if (this.isHurt()) {
        this.playSound(this.hurting_sound);
      } else if (this.isAboveGround()) {
        this.playSound(this.jumping_sound);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playSound(this.walking_sound);
        } else if (this.timeCharacterMoved() > 5) {
          this.playSound(this.snoring_sound);
        }
      }
    }
  }

  /**
   * This function moves character to the right with the according image
   * @param {*}  = no param
   */
  walkLeft() {
    this.moveLeft();
    this.otherDirection = true;
  }

  /**
   * This function moves character to the left with the according flipped image
   * @param {*}  = no param
   */
  walkRight() {
    this.moveRight();
    this.otherDirection = false;
  }

  /**
   * This function lets character jump
   * @param {*}  = no param
   */
  jump() {
    this.speedY = 30;
  }

    /**
   * This function checks if character comes down
   * @param {*}  = no param
   */
  comesDown() {
    if(this.isAboveGround() && this.speedY <= 0 && this.speedY >= -32) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This function checks how much time has passed between now and last character movement
   * @param {*}  = no param
   */
  timeCharacterMoved() {
    let timepassed = new Date().getTime() - this.actionTime;
    timepassed = timepassed / 1000;
    return timepassed;
  }
}
