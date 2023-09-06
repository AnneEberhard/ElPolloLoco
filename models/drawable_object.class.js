class DrawableObject {
  //super class for all drawn objects
  x;
  y;
  img;
  height;
  width;
  currentImage = 0;
  imageCache = {};

  /**
   * This function loads one new image
   * @param {*} path = source path of the new image
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function loads the source paths for different images into a JSON called ImageCache
   * @param {*} pathArray = array with different paths
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


drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }


}