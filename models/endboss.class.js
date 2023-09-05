class Endboss extends MovableObject{
    height = 500; 
    width = 400;
    y = -28;
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
        "img/4_enemie_boss_chicken/2_alert/G12.png"
    ]
    chicken_sound = new Audio('audio/bigChicken.mp3');
  
    constructor() {
      super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png"); 
      this.loadImages(this.IMAGES_ALERT);
      this.x = 2200; //ändern wenn Endboss fertig
      this.animate();
    }
  
    animate() {
        setInterval(() => {
          this.playAnimation(this.IMAGES_ALERT);
          //this.chicken_sound.play(); 
        }, 200);
      }
}