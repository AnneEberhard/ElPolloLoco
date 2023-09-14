class ChickenSmall extends MovableObject {
    height = 80;
    width = 80;
    y = 340;
    IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
    chicken_sound = new Audio("audio/chickenShort.mp3");
    world;
    energy = 5;
  
    constructor() {
      super().loadImages(this.IMAGES_WALKING);
      this.loadImage(this.IMAGE_DEAD);
      this.x = 300 + Math.random() * 1000;
      this.speed = 0.20 + Math.random() * 0.25;
      this.animate();
    }
  
    animate() {
      setStoppableInterval(this.chickenMoving.bind(this), 1000 / 60);
      setStoppableInterval(this.chickenImages.bind(this), 100);
    }
  
    chickenMoving() {
      if (!this.isDead() && this.gameIsRunning()) {
        this.moveLeft();
      }
    }
  
    chickenImages() {
      if (this.isDead()) {
        this.img.src = this.IMAGE_DEAD;
        //this.chicken_sound.pause();
      } else {
        if (this.gameIsRunning()) {
          this.playAnimation(this.IMAGES_WALKING);
          //this.playChicken();
        }
      }
    }
  
    playChicken() {
      if (this.gameIsRunning()) {
        let distanceToCharacter = Math.abs(this.x);
        let distanceToCamera = Math.abs(this.x + this.world.camera_x);
        if (distanceToCharacter < 780 && distanceToCamera < 680) {
          this.chicken_sound.play();
        }
      }
    }
  }
  