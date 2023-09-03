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

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); //greift auf übergeordnete Klasse zu
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => { //bewegt Charakter nach links oder rechts
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { //kann nicht weiter nach rechts
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) { //kann nicht weiter nach links
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x +100; //Position der Kamera, damit Position des Charakters
    }, 1000 / 60);

    setInterval(() => { //animiert mit verschiedenen Bildern
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // modulo (%) gibt den Rest raus, also z.B. 7 % 6 = 1
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {
    console.log("jump");
  }
}
