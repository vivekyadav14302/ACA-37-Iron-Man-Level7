// load variables
var bg, backgroundImg;

function preload() {
  // load all images
  backgroundImg = loadImage("images/bg.jpg");
  ironManImg = loadImage("images/iron.png");
  stoneimg = loadImage("images/stone.png");
  diamondImg = loadImage("images/diamond.png");
  spikesImg = loadImage("images/spikes.png");
}

function setup() {
  // create Character , groups and other settings
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg1 = createSprite(580,-300);
  bg.addImage(backgroundImg);
  bg1.addImage(backgroundImg);
  bg.scale = 2;
  bg1.scale = 2;
  bg.velocityY = 3;
  bg1.velocityY = 3;
  ironMan = createSprite(100,450,150,40);
  ironMan.addImage(ironManImg);
  ironMan.scale = 0.3
  score = 0
  gameState = 'Play'
  stoneGroup = new Group();
  diamondGroup = new Group();
  spikesGroup = new Group();
}

function draw() {
  if(gameState == 'Play'){
  // game control keys
  if(keyDown("up")){
    ironMan.velocityY = -10;
  }

  if(keyDown("left")){
    ironMan.x = ironMan.x - 5;
  }
    
  if(keyDown("right")){
    ironMan.x = ironMan.x + 5;
  }

    ironMan.velocityY = ironMan.velocityY + 0.5;
  // bg control
    if(bg.y > 900){
      bg.y = -300
    }

    if(bg1.y > 900){
      bg1.y = -300
    } 
    // stone come in seconds
     if(frameCount%90 == 0){
      stonegen()
  }
  // ironMan touching settings to stone 
    for(k = 0; k < (stoneGroup).length; k++){
        mystone = stoneGroup.get(k)
      if(ironMan.isTouching(mystone)){
          ironMan.collide(mystone)
      }
  }

// diamond come in seconds
  if(frameCount%130 == 0){
     diamondgen()
}
// ironMan touching settings to diamonds
for(u = 0; u < (diamondGroup).length; u++){
    mydiamond = diamondGroup.get(u)
    if(ironMan.isTouching(mydiamond)){
        mydiamond.destroy()
        mydiamond = null
        score++
    }
}
// spikes come in seconds
  if(frameCount%120 == 0){
    spikesgen()
}
// ironMan touching settings to spikes
for(w = 0; w < (spikesGroup).length; w++){
    myspikes = spikesGroup.get(w)
    if(ironMan.isTouching(myspikes)){
        myspikes.destroy()
        score = score-5
    }
}
  if(score <= -10 || ironMan.y > 610){
    gameState = 'End';
  } 
 
}
  
  else{
    bg.velocityY = 0;
    bg1.velocityY = 0;
    diamondGroup.setVelocityYEach(0);
    spikesGroup.setVelocityYEach(0);
    stoneGroup.setVelocityYEach(0);
    diamondGroup.setLifetimeYEach(0);
    spikesGroup.setLifetimeYEach(0);
    stoneGroup.setLifetimeYEach(0);
  }
  
    drawSprites();

   
    // score genrator code
    textSize(24)
    fill("white")
    text("Diamonds Collected: " + score, 50, 50)
   
}

// stones create function
function stonegen(){
  s = createSprite(300,10,200,60);
  s.addImage(stoneimg);
  s.velocityY = 5;
  s.lifetime = 230;
  s.x = random(100,1000)
  stoneGroup.add(s)

}
// diamonds create function
function diamondgen(){
  d = createSprite(300,10,200,60);
  d.addImage(diamondImg)
  d.velocityY = 5
  d.lifetime = 230;
  d.x = random(100,1000)
  d.scale = 0.7
  diamondGroup.add(d)
}
// spikes create function
function spikesgen(){
  p = createSprite(300,10,200,60);
  p.addImage(spikesImg)
  p.velocityY = 5
  p.lifetime = 230;
  p.x = random(50,1000)
  p.scale = 0.7
  spikesGroup.add(p)
}