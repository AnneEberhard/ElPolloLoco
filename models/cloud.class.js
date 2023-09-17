class Cloud extends MovableObject {
  y = 50;
  height = 300;
  width = 500;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2000;
    setStoppableInterval(this.animate.bind(this), 1000 / 10);
  }

  /**
   * This function starts animation for the clouds when game is running
   * @param {*}  = no param
   */
  animate() {
    if (pause == false) {
      this.moveLeft();
    }
  }
}
