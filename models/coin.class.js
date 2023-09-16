class Coin extends MovableObject {
  height = 200;
  width = 200;

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 70,
    right: 70,
    bottom: 70,
    left: 70,
  };


  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = 100 + Math.random() * 2000;
    this.y = Math.random() * 300;
    this.animate();
  }

 /**
   * This function starts animation for the coins with a stoppable interval
   * @param {*}  = no param
   */
  animate() {
    setStoppableInterval(this.coinImages.bind(this), 200);
  }

   /**
   * This function plays anaimation for the coins
   * @param {*}  = no param
   */
  coinImages() {
    this.playAnimation(this.IMAGES_COIN);
  }
}
