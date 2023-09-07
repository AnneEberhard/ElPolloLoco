class Bottle extends MovableObject {
    height = 100;
    width = 100;
    y = 300;
  
    offset = {
        top: 20,
        right:40,
        bottom:0,
        left:40
      }

    constructor() {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"); 
        this.x = 100 + Math.random() * 2000;
        this.y = 300 + Math.random() * 25;
    }
  }