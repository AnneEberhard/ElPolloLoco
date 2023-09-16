class Statusbar extends DrawableObject {
  IMAGES;
  percentage = 100;
  height = 50;
  width = 200;
  x = 50;

  /**
   * This function sets percentage
   * @param {number}  percentage = percentage as added from outside
   */
  setPercentage(percentage) {
    this.percentage = percentage; //percentage is assigned a variable
    let path = this.IMAGES[this.getImageIndex()]; //path is assigned from the array according to index
    this.img = this.imageCache[path]; //img is assigned according to path out of the cache which was loaded earlier
  }

  /**
   * This function returns the correct index for the paths from the array of image-soruces
   * @param {*}  = no param
   */
  getImageIndex() {
    return Math.floor(this.percentage / 20);
  }
}
