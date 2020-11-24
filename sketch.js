  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;

function preload(){
    
    backgroundImage= loadImage("jungle.jpg");
  
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png",
 "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
}

function setup() {  
    createCanvas(600,280);
 
    backgroundy= createSprite (200,40,400,400);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.velocityX= -2;
    
    monkey= createSprite (70,140,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
    ground= createSprite (200,265,400,5);
    ground.visible= false;
 
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
    background("white");

    if (backgroundy.x<150) {
      backgroundy.x= 200
    }   
  
    if (keyDown ("space") && monkey.y>=220) {
      monkey.velocityY= -20;  
    }    

    monkey.velocityY= monkey.velocityY + 0.9;
 
    monkey.collide (ground);
  
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
      
    }
  
    switch (score) {
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1
    }

    spawnBananas();
    spawnObstacles();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,400,45);
  
  
    drawSprites();
  

   
}

function spawnBananas () {
  if (frameCount%90===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    banana.lifetime= 150;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
if (frameCount%200===0) {
    obstacle= createSprite(610, 247,10,10);
    obstacle.x=610 ;
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.velocityX=-5;
    obstacle.lifetime=122;
    obstacle.scale=0.18;
    obstacle.setCollider("rectangle",0,0,300,300);
    obstacleGroup.add(obstacle);
    
     
}
}