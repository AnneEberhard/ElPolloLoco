class Cloud extends MovableObject {
    constructor() {
      // wird immer aufgerufen, wenn die Klasse aufgerufen wird
      super().loadImage("img/5_background/layers/4_clouds/1.png"); //greift auf übergeordnete Klasse zu
      this.x = Math.random()*500;
      this.y = 50;
      this.height = 300;
      this.width = 300;
    }
  }