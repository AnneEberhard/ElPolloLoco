class Endscreen extends DrawableObject {
  IMAGES = [
    "img/9_intro_outro_screens/game_over/you lost.png",
    "img/9_intro_outro_screens/game_over/game over.png"
  ];
      x = 0;
      y= 0;
      height = 480;
      width = 720;
    
      constructor(i) {
        super();
        this.loadImage(this.IMAGES[i]);
    }
}