var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  doorsGroup = new Group();
  climberImg = loadImage("climber.png");
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghostImg = loadImage("ghost-standing.png");
  SpookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  SpookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  spawnDoors();
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw() {
  background(200);

  if(gameState === "play") {
  
    if(keyDown("LEFT_ARROW")) {
      ghost.x = ghost.x - 3;
    }

    if(keyDown("RIGHT_ARROW")) {
      ghost.x = ghost.x + 3;
    }

    if(keyDown("SPACE")) {
      ghost.velocityY = ghost.velocityY - 5
    }
  
    ghost.velocityY = ghost.velocityY + 0.8;

    if(tower.y > 400){
      tower.y = 300
    }

    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }

  spawnDoors();
  drawSprites();
  
  if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}

function spawnDoors() {
  if(frameCount %240===0) {
    //create sprites
    var door = createSprite(200, -50);
    door.addImage("door", doorImg);
    var climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);

    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2;

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    
    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    //assign lifetime
    door.lifetime = 800;
    climber.lifetime = 800;

    //adding to groups
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
