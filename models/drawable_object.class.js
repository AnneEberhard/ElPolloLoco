class DrawableObject {
  //super class for all drawn objects
  x;
  y;
  img;
  height;
  width;
  currentImage = 0;
  imageCache = {};

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * This function loads one new image
   * @param {string} path = source path of the new image
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function loads the source paths for different images into a JSON called ImageCache
   * @param {array} pathArray = array with different paths
   */
  loadImages(pathArray) {
    pathArray.forEach((path) => {
      let img = new Image(); //this variable is only valid in the function and create new image Object
      img.src = path; //src path is assigned to this image
      this.imageCache[path] = img; //this variable is valid throughout the entire class and adds the new image to the JSON ImageCache
    });
  }

  /**
   * This function draws onto the canvas
   * @param {*} ctx = context for 2d canvas
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

}
