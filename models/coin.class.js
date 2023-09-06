class Coin extends DrawableObject {
    height = 200;
    width = 200;
    y = 100;
  
    constructor() {
        super().loadImage("img/8_coin/coin_2.png"); 
        this.x = 100 + Math.random() * 2000;
        this.y = Math.random() * 250;

    }
  }