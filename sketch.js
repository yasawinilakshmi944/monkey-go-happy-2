 //creating variables
  var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;

function preload(){
    
    backgroundImage= loadImage("jungle.jpg");
  
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("stone.png");
}

function setup() {
  //creating canvas  
    createCanvas(600,280);
  
  //creating background sprite
    backgroundy= createSprite (200,40,400,400);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.velocityX= -2;
    
  //creating monkey sprite
    monkey= createSprite (70,140,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
  //creating ground sprite
    ground= createSprite (200,265,400,5);
    ground.visible= false;
  
  //creating groups for banana and obstacles
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
  //assigning background color
    background("white");
  
  
  
  //reseting background
    if (backgroundy.x<150) {
      backgroundy.x= 200
    }   
  
  //making the monkey jump  
    if (keyDown ("space") && monkey.y>=220) {
      monkey.velocityY= -20;  
    }    
    
  //adding gravity to monkey
    monkey.velocityY= monkey.velocityY + 0.9;
  
  //preventing the monkey from falling off the ground
    monkey.collide (ground);
  
  //scoring system and changing size of the monkey
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
  
   
  //calling user-defined functions
    spawnBananas();
    spawnObstacles();
  
  //drawing sprites
    drawSprites();
  
  //displaying score
    stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);  
}

//function for bananas
function spawnBananas () {
  if (frameCount%90===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -3;
    
    //adding lifetime to bananas
      banana.lifetime= 150;
    
    //adding banana to banana group
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
    //stone.debug=true;
    obstacle.setCollider("rectangle",0,0,350,350);
    obstacleGroup.add(obstacle);
     
}
}