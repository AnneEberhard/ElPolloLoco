class Bottle extends MovableObject {
    height = 80;
    width = 80;
    y = 300;
    IMAGE_BOTTLEFLIP = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]
  
    offset = {
        top: 20,
        right:40,
        bottom:0,
        left:40
      }

    constructor() {
        const randomIndex = Math.random() < 0.5 ? 0 : 1; // choosing ranom between 0 and 1
        super().loadImage(this.IMAGE_BOTTLEFLIP[randomIndex]); //one of the images gets assigned randomly
        this.x = 100 + Math.random() * 2000;
        this.y = 300 + Math.random() * 25;
    }
  }