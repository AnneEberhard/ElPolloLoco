class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  currentImage = 0;

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); //greift auf übergeordnete Klasse zu
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length; // modulo (%) gibt den Rest raus, also z.B. 7 % 6 = 1
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  jump() {
    console.log("jump");
  }
}
