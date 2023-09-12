function checkCollectingAll() {
    let coins = this.level.coins;
    let coinsCollected = this.character.coinsCollected;
    let statusBarCoin = this.statusBarCoin;
    this.checkCollecting(coins, coinsCollected, statusBarCoin);
  }


  function checkCollisionCoin() {
    for (let i = 0; i < this.level.coins.length; i++) {
      let coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
        this.character.coinsCollected += 20;
        this.statusBarCoin.setPercentage(this.character.coinsCollected);
      }
    }
  }

  function  checkCollisionBottle() {
    for (let i = 0; i < this.level.bottles.length; i++) {
      let bottle = this.level.bottles[i];
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(i, 1);
        this.character.bottlesCollected += 20;
        this.statusBarBottle.setPercentage(this.character.bottlesCollected);
      }
    }
  }

  function playAnimationOnce(images) {
    let i = images.length - 1;
    this.getAnimation(images, i);
  }

  function getAnimation(images, i) {
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }