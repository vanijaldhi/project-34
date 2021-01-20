//Create variables here
var dog;
var happydog,database,food,foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  hdog = loadImage("happydog.png");
}

function setup() {
	createCanvas(1000, 1000);
  dog = createSprite(500,400,5,5);
  dog.addImage(dogImage);

  database = firebase.database();
  console.log(database);

  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
   background(46,139,87);
  
   if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(hdog);
   }

   textSize(20);
   fill("yellow");
   stroke("black");
   text("PRESS UP ARROW KEY TO FEED OUR CUTE DOG FUDGE MILK",200,800)
   
  drawSprites();
}

function readStock(data){
  food = data.val;
}

function writeStock(x){

  if(x <= 0){
    x = 0;
  } 
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })

}
