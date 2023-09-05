class Cloud extends MovableObject {
  y = 50;
  height = 300;
  width = 500;
 

  constructor() {
    // wird immer aufgerufen, wenn die Klasse aufgerufen wird
    super().loadImage("img/5_background/layers/4_clouds/1.png"); //greift auf übergeordnete Klasse zu
    this.x = Math.random() * 2000;
    this.animate();
  }

  animate() {
    setInterval( () => {
      this.moveLeft();
    }, 1000 / 10 )  
   }
}
