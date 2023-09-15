class Chicken extends MovableObject {
    height = 80;
    width = 80;
    world;
    energy = 5;
  
  
    chickenMoving() {
      if (!this.isDead() && this.gameIsRunning()) {
        this.moveLeft();
      }
    }
  
    chickenImages() {
      if (this.isDead()) {
        this.img.src = this.IMAGE_DEAD;
        this.chicken_sound.pause();
      } else {
        if (this.gameIsRunning()) {
          this.playAnimation(this.IMAGES_WALKING);
          this.playChicken();
        }
      }
    }
  
    playChicken() {
        if (this.gameIsRunning()) {
          let distanceToCharacter = this.world.character.x - this.x;
          if (distanceToCharacter < 200 && distanceToCharacter > -780  && soundIsOn) {
            this.chicken_sound.play();
          }
        }
      }
  
  }
  