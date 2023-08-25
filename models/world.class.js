class World {
  character = new Character(); //verweist auf Klasse Character
  enemies = [
    new Chicken(), // verweist auf Klasse Chicken
    new Chicken(),
    new Chicken(),
  ];
  clouds = [
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ]
  ctx; 
  canvas; //brauchen wir für das clearen, wird unten zugewiesen

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas; //brauchen wir für das clearen
    this.draw(); 
  }

  draw() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height); //canvas ist wieder leer

    this.ctx.drawImage(this.character.img,this.character.x,this.character.y,this.character.width,this.character.height);
    this.enemies.forEach(enemy => {
        this.ctx.drawImage(enemy.img,enemy.x,enemy.y,enemy.width,enemy.height);
    })
    this.clouds.forEach(cloud => {
        this.ctx.drawImage(cloud.img,cloud.x,cloud.y,cloud.width,cloud.height);
    })


    //Draw() wird immer wieder aufgerufen, aber CAVE: canvas muss vorher gelöscht werden, sonst doppelt
    let self = this;
    requestAnimationFrame(function() {
        self.draw();
    });
  }
}
