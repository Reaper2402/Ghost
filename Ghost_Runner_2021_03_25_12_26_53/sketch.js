var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";


function preload(){
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  towerImg=loadImage("tower.png");
  climberImg=loadImage("climber.png");  
  spooky1=loadSound("spooky.wav");
  
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  spooky1.loop();
}
function draw(){
  background(0);
  
  if(gameState==="play"){
    if(tower.y>400){
      tower.y=300;
    }
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY=-5;
    }
    ghost.velocityY=ghost.velocityY+0.8;       
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
    }
      spawnDoors();
      drawSprites();
  }
if(gameState==="end"){
  stroke("yellow");
  fill("red");
  textSize(30);
  text("Game Over",300,-50);
}
}
function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    door.addImage("door",doorImg);
    
    var climber=createSprite(200,10);
    climber.addImage("climber",climberImg);
    
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400));
    door.velocityY=2;
    
    climber.x=door.x;
    climber.velocityY=2;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleBlock.lifetime=800;
    door.lifetime=800;
    climber.lifetime=800;  
    
    climbersGroup.add(climber);
    doorsGroup.add(door);
    invisibleBlocksGroup.add(invisibleBlock);
  }
}