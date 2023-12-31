class Endboss extends MovableObject {
  height = 500;
  width = 400;
  y = -28;
  world;
  speed = 5;
  energy = 15;
  i = 0;
  offset = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  chicken_sound = new Audio("audio/bigChicken.mp3");
  dying_chick_sound = new Audio("audio/dyingChicken.mp3");

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.animate();
  }

  /**
   * This function starts animation for the endboss with a stoppable interval
   * @param {*}  = no param
   */
  animate() {
    setStoppableInterval(this.endBossAnimation.bind(this), 200);
  }

  /**
   * This function assigns animation for the endboss with regard to the status of the endboss
   * @param {*}  = no param
   */
  endBossAnimation() {
    if (this.isDead()) {
      this.endbossDead();
    } else if (this.isHurt()) {
      this.endbossHurt();
    } else if (this.world && this.world.character.x > 1600) {
      this.endBossActing();
      this.i++;
    } else {
      this.i = 0;
    }
  }

  /**
   * This function assigns animation for the endboss when dead
   * @param {*}  = no param
   */
  endbossDead() {
    this.playAnimation(this.IMAGES_DEAD);
    this.playSound(this.dying_chick_sound);
    world.gameOver(1);
  }

  /**
   * This function assigns animation for the endboss when hurt
   * @param {*}  = no param
   */
  endbossHurt() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * This function assigns animation for the endboss when neither dead nor hurt
   * @param {*}  = no param
   */
  endBossActing() {
    if (this.gameIsRunning()) {
      this.playSound(this.chicken_sound);
      if (this.i < 10 && this.x - this.world.character.x > 200) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        if (this.x - this.world.character.x > 80) {
          this.playAnimation(this.IMAGES_WALKING);
          this.moveLeft();
        } else {
          this.playAnimation(this.IMAGES_ATTACK);
        }
      }
    }
  }
}
