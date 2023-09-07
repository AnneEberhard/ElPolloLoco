class Coin extends MovableObject {
    height = 200;
    width = 200;
  
    offset = {
        top: 70,
        right:140,
        bottom:140,
        left:70
      }

    constructor() {
        super().loadImage("img/8_coin/coin_2.png"); 
        this.x = 100 + Math.random() * 2000;
        this.y = Math.random() * 300;
    }
  }