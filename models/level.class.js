class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2100;
    world;

    constructor(enemies, clouds, backgroundObjects){
       this.enemies = enemies; //könnten auch andere Namen haben, btw
       this.clouds = clouds;
       this.backgroundObjects = backgroundObjects; 
    }
}