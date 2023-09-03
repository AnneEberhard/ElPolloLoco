class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  speed = 5;
  walking_sound = new Audio('audio/running.mp3');


  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); //greift auf übergeordnete Klasse zu
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    
    setInterval(() => { //bewegt Charakter nach links oder rechts
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { //kann nicht weiter nach rechts
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) { //kann nicht weiter nach links
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x +100; //Position der Kamera, damit Position des Charakters
    }, 1000 / 60);

    setInterval(() => { //animiert mit verschiedenen Bildern
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  jump() {
    console.log("jump");
  }
}
