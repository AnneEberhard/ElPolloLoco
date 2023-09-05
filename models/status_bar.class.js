class Statusbar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  percentage = 100;
  height = 50;
  width= 200;
  x =  50;
  y = 50;


  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);
  }

  /**
   * This function sets percentage
   * @param {*}  percentage = percentage as added from outside
   */
  setPercentage(percentage) {
    this.percentage = percentage; //percentage is assigned a variable
    let path = this.IMAGES_HEALTH[this.getImageIndex()]; //path is assigned from the array according to index
    this.img = this.imageCache[path]; //img is assigned according to path out of the cache which was loaded earlier
}


   /**
   * This function returns the correct index for the paths from the array of image-soruces
   * @param {*}  = no param
   */
  getImageIndex() {
    return Math.floor((this.percentage) / 20);
  }
}
