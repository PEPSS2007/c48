var backg,backimg;
var corona,coronaimg;
var shop1,shop2,shop3;
var m1,m2,m3;
var score=0;
var vaccinated=0;
var nmw;
var peogroup;
var shopg;
var coronag;
var ing;
var hospital,hospitalimg;


function preload(){
  backimg=loadImage("bgimg.jpg")
  coronaimg=loadImage("corona.png")
  shop1=loadImage("shop1.png")
  shop2=loadImage("shop2.png")
  shop3=loadImage("shop.png")
  nmw=loadImage("nmw1.png")
  m1=loadImage("mw1.png")
  m2=loadImage("mw2.png")
  m3=loadImage("mw3.png")
  hospitalimg=loadImage("hospital.png")

}

function setup(){
  createCanvas(displayWidth,displayHeight);

  corona=createSprite(displayWidth-400,displayHeight-250,20,20);
  corona.addImage(coronaimg)
  corona.scale=0.25
  //corona.debug=true

  ing= createSprite(displayWidth-150,displayHeight-200,4000,20);
  ing.visible = false;

  hospital=createSprite(displayWidth-150,displayHeight-200,20,20)
  hospital.addImage(hospitalimg)
  hospital.scale=0.8
 // hospital.debug=true
  hospital.setCollider("circle",0,0,200)
  
 
  score = 0;
  vaccinated=0;
  peogroup= new Group();
  shopg=new Group();
  coronag=new Group();
  coronag.add(corona)
}

function draw() {
  background(backimg)
  if(keyDown("space")){
    corona.velocityY=-10

  }
  corona.velocityY=corona.velocityY+0.8
 
  corona.collide(ing)


 
  spawnpeople()
  shops()

  if(shopg.isTouching(coronag)){
    score=score+1
    corona.scale=0.25
    shopg.destroyEach();
  }

  if(shopg.isTouching(hospital)){
    vaccinated=vaccinated+1
    shopg.destroyEach();
  }

  if (peogroup.isTouching(coronag)){
    corona.scale=0.05
  }

  if(vaccinated===5){
    coronag.destroyEach();
    peogroup.destroyEach();
    shopg.destroyEach();
    fill("black")
    textSize(100)
    text("STAY HOME,STAY SAFE",displayWidth-1200,displayHeight/2)
  }

  drawSprites()
  fill("black")
  textSize(30)
  text("INFECTED:"+score,displayWidth-250,displayHeight-600)

  fill("black")
  textSize(30)
  text("VACCINATED:"+vaccinated,displayWidth-300,displayHeight-500)
}

function spawnpeople(){
  if(World.frameCount%150===0){
  var people=createSprite(Math.round(random(50,350)),displayHeight-250,20,20)
  people.velocity.x=3
  people.velocityX = (5 + 3*score/100);
  people.lifetime = 500;
  var randm=Math.round(random(1,3))
  switch(randm){
    case 1:people.addImage(m1)
    break;
    case 2:people.addImage(m2)
    break;
    case 3:people.addImage(m3)
    break;
    default:break
  }
  peogroup.add(people)
 // people.debug=true
 people.setCollider("circle",0,0,160)

  
  }
}

function shops(){
  if(World.frameCount%275===0){
    var shop =createSprite(Math.round(random(0,300)),displayHeight-250,50,100)
    shop.velocityX=2
    shop.velocityX = (6 + 3*score/100);
    shop.lifetime=500
  var rand=Math.round(random(1,4))
  switch(rand){
    case 1:shop.addImage(shop1)
    break;
    case 2:shop.addImage(shop2)
    break;
    case 3:shop.addImage(shop3)
    break;
    case 4:shop.addImage(nmw)
    break;
    default:break
  }
  //shop.debug=true
  shopg.add(shop)
  }
}