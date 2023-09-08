class ThrowableObject extends MovableObject {
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
  
    offset = {
      top: 20,
      right:40,
      bottom:0,
      left:40
    }
  
    constructor(x,y) {
      super();
      this.loadImages(this.IMAGES_SPLASH);
      this.x = x;
      this.y = y;
      this.splash();
    }
  
    throw() {
      this.speedY = 30;
      this.applyGravity();
      setInterval( () => {
          this.x += 10;
          this.playAnimationOnLoop(this.IMAGES_ROTATION);
      }, 30)
    }
  }
  