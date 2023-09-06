class Endscreen extends DrawableObject {
    IMAGE = [
        "img/9_intro_outro_screens/game_over/game over.png",
      ];
      x = 0;
      y= 0;
      height = 480;
      width = 720;
    
      constructor() {
        super();
        this.loadImage(this.IMAGE);
      }
}