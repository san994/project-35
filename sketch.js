var balloon;
var position;
var database;

function setup() {
  database = firebase.database();
  createCanvas(900,500);
  balloon = createSprite( 50 , 450 , 50, 50);
  balloon.addImage(balloonImg2);
  balloon.scale = 0.5;

  
  var balloonPosition = database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError);

}

function preload(){

 backImg = loadImage("Hot Air Ballon-01.png");
 balloonImg2 = loadImage("Hot Air Ballon-02.png")
 
}

function draw() {
  background(backImg);  

  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){

    writePosition(-1,0);
    
  }
  else if(keyDown(RIGHT_ARROW)){

    writePosition(1,0);
   
  }
  else if(keyDown(UP_ARROW)){

    writePosition(0,-1);
    balloon.scale = balloon.scale -0.01;

  }
  else if(keyDown(DOWN_ARROW)){

    writePosition(0,+1);
    balloon.scale = balloon.scale +0.01;

  }
  }

  drawSprites();
}



function writePosition(x,y){

database.ref('balloon/position').set({

  'x': position.x +x,
  'y': position.y +y


})

}

function readPosition(data){

  position = data.val();
  console.log(position.x)
  balloon.x = position.x;
  balloon.y = position.y;
 
 }

function showError(){

 console.log("error")

}

