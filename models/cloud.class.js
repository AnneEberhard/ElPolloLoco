class Cloud extends MovableObject {
  y = 50;
  height = 300;
  width = 500;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2000;
    this.animate();
  }

  /**
   * This function starts animation for the clouds with a stoppable interval
   * @param {*}  = no param
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 10);
  }
}
