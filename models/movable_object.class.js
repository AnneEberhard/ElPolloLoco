class MovableObject {
  //Superklasse für alle bewegten Objekte; n Klassen braucht man weder let noch function
  x = 120;
  y = 125;
  img;
  height = 300;
  width = 150;
  imageCache = {};


  loadImage(path) {
    this.img = new Image(); //JS für: this.img = document.getElementById('image') <image id='image'> kommt erst später in HTML
    this.img.src = path;
  }

/**
 * Diese Funktion lädt die Pfade für verschiedene Bilder in ein JSON namens ImageCache
 * @param {*} pathArray = array mit den verschiedenen Pfaden
 */
  loadImages(pathArray) {
    pathArray.forEach(path => {
      let img = new Image(); //diese Variable ist nur in dieser Funktion gültig und kreiiert ein Bild
      img.src = path; //hier wird dem neuen Bild der Pfad zugewiesen
      this.imageCache[path] = img; //diese Variable ist überall im Object gültig und fügt dem JSON das neue Bild zu
    });
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {
    console.log("moveLeft");
  }
}
