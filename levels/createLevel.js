let level1;

function createLevel() {
  level1 = new Level(
    createEnemies(),
    createClouds(),
    createBackground(),
    createCoins(),
    createBottles()
  );
}

function createEnemies() {
  return [
    new ChickenNormal(),
    new ChickenNormal(),
    new ChickenNormal(),
    new ChickenNormal(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Endboss(),
  ];
}

  /**
   * This function returns array with new objects clouds
   * @param {*}  = no param
   */
function createClouds() {
  return [new Cloud(), new Cloud(), new Cloud()];
}

  /**
   * This function returns array with new objects for background including the positions
   * @param {*}  = no param
   */
  function createBackground() {
    const backgrounds = [];
    for (let i = -1; i <= 3; i++) {
      const prefix = i % 2 === 0 ? "2" : "1";
      backgrounds.push(
        new BackgroundObjects(`img/5_background/layers/air.png`, 719 * i),
        new BackgroundObjects(`img/5_background/layers/3_third_layer/${prefix}.png`, 719 * i),
        new BackgroundObjects(`img/5_background/layers/2_second_layer/${prefix}.png`, 719 * i),
        new BackgroundObjects(`img/5_background/layers/1_first_layer/${prefix}.png`, 719 * i)
      );
    }
    return backgrounds;
  }
  

  /**
   * This function returns array with new objects coins
   * @param {*}  = no param
   */
function createCoins() {
  return [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
}
  /**
   * This function returns array with new objects bottles
   * @param {*}  = no param
   */
function createBottles() {
  return [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()];
}