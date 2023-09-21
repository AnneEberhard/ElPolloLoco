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
    new ChickenMedium(),
    new ChickenMedium(),
    new ChickenMedium(),
    new ChickenMedium(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Endboss(),
  ];
}


function createClouds() {
  return [new Cloud(), new Cloud(), new Cloud()];
}

function createBackground() {
  const backgrounds = [];
  for (let i = -1; i < 4; i++) {
    backgrounds.push(
      new BackgroundObjects(`img/5_background/layers/air.png`, 719 * i),
      new BackgroundObjects(`img/5_background/layers/3_third_layer/2.png`, 719 * i),
      new BackgroundObjects(`img/5_background/layers/2_second_layer/2.png`, 719 * i),
      new BackgroundObjects(`img/5_background/layers/1_first_layer/2.png`, 719 * i)
    );
  }
  return backgrounds;
}


function createCoins() {
  return [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()];
}
function createBottles() {
  return [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()];
}