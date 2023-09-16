class SplashableObject extends MovableObject {
  height = 80;
  width = 80;
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  splashing_sound = new Audio("audio/splash.mp3");

  offset = {
    top: 20,
    right: 40,
    bottom: 0,
    left: 40,
  };

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png"
    );
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    setStoppableInterval(this.splashImage.bind(this), 100);
    this.playSound(this.splashing_sound);
  }

  /**
   * This function starts image for bottles splashing on the enemy
   * @param {*}  = no param
   */
  splashImage() {
    this.playAnimationOnce(this.IMAGES_SPLASH);
  }
}
