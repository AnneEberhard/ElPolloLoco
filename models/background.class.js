class BackgroundObjects extends MovableObject {
   x = 0;
    y = 0;
    height = 480;
    width = 720;

      constructor(imagePath, x) {
        super().loadImage(imagePath); 
        this.x = x;
        this.y = 480 - this.height;
           }
    }