class MovableObject {
  //Superklasse für alle bewegten Objekte; n Klassen braucht man weder let noch function
  x = 120;
  y = 200;
  img;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image(); //JS für: this.img = document.getElementById('image') <image id='image'> kommt erst später in HTML
    this.img.src = path;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {
    console.log("moveLeft");
  }
}
