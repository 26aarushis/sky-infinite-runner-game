var girl, girlImg;
var balloon, balloonImg;
var sky, skyImg;
var fork, forkImg, forksGroup, knivesImg, scissorsImg;
var dragon, dragonImg, dragonsGroup; 
var warning, warningImg, warningsGroup; 
var jumpSound;
var dieSound; 
var gameOver, gameOverImg;
var restart, restartImg;
var star, starImg, starsGroup;

//game states 

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    girlImg = loadImage("game.png");
    balloonImg = loadImage("balloon.png");
    forkImg = loadImage("fork.png");
    dragonImg = loadImage("dragon.png");
    warningImg = loadImage("warning.png");
    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");
    skyImg = loadImage("sky.png");
    starImg = loadImage("star.png");
    scissorsImg = loadImage("scissors.png");
    knivesImg = loadImage("knives.png");
}

function setup() {
    createCanvas(400,400);
    background(135,206,235);

    girl = createSprite(250,250,20,20);
    girl.addImage(girlImg);
    girl.scale = 0.3;

    balloon = createSprite(280,200,20,20);
    balloon.addImage(balloonImg);
    balloon.scale = 0.13;

    sky = createSprite(250,250, 20, 500);
    sky.addImage(skyImg);
    sky.scale = 0.8;
    sky.x = width/2;
    sky.depth = girl.depth-1

    forksGroup = createGroup();
    starsGroup = createGroup();
    dragonsGroup = createGroup();
    warningsGroup = createGroup();

    gameOver = createSprite(200,150,20,20);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.2;
    gameOver.visible = false;

    restart = createSprite(200,250,20,20);
    restart.addImage(restartImg);
    restart.scale = 0.3;
    restart.visible = false;
}

function draw() { 

    

    if (gameState === PLAY) {
        sky.velocityY = 2;

        gameOver.visible = false;
        restart.visible = false;
       
        if (sky.y > 370) {
            sky.y = 100;
        }

        if (keyDown("right_arrow")) {
            girl.x = girl.x + 4;
            balloon.x = balloon.x + 4;
        }

        if (keyDown("left_arrow")) {
            girl.x = girl.x - 4;
            balloon.x = balloon.x - 4;
        }

        if (keyDown("space")) {
            girl.velocityY = -6
        }

        if (girl.isTouching(starsGroup)) {
            girl.velocityY = 0;
        }

        if (balloon.isTouching(forksGroup)) {
            gameState = END;
        }

        if (girl.isTouching(dragonsGroup)) {
            gameState = END;
        }

        if (girl.y > 490) {
            gameState = END;
        }

        girl.velocityY = girl.velocityY + 0.8;

        balloon.velocityY = girl.velocityY;

        spawnForks();

        spawnStars();

        spawnDragons();
    }

    else {
        if(gameState === END) {
            girl.velocityY = 0;
            sky.velocityY = 0;
            balloon.velocityY = 0;
            forksGroup.setVelocityEach(0);
            starsGroup.setVelocityEach(0);
            dragonsGroup.setVelocityEach(0);
            warningsGroup.setVelocityEach(0);
            gameOver.visible = true;
            restart.visible = true;
            forksGroup.setLifetime
            
    
            if (mousePressedOver(restart) == true) {
                gameState = PLAY;
                forksGroup.destroyEach();
                starsGroup.destroyEach();
                dragonsGroup.destroyEach();
                warningsGroup.destroyEach();
                girl.y = 200;
                girl.x = 200; 
                balloon.y = girl.y - 50;
                balloon.x = girl.x +30;        
            }
        }
    } 
    
    drawSprites();
}

function spawnForks() {
    if (frameCount%370 == 0) {
        fork = createSprite(200,-50);
        fork.addImage(forkImg);
        fork.x = Math.round(random(10,190));
        fork.velocityY = 2;
        fork.lifetime = 600;
        fork.scale = 0.1
        forksGroup.add(fork);

        fork.debug = false;
        fork.setCollider("rectangle", 0,0,600,300);

        ran = Math.round(random(1,3));
        switch(ran){
            case 1: fork.addImage(forkImg);
                break;
            case 2: fork.addImage(scissorsImg);
                break;
            case 3: fork.addImage(knivesImg);
                break;
            default:
        }
    }
}

function spawnStars() {
    if (frameCount%390 == 0) {
        star = createSprite(200, -50);
        star.addImage(starImg);
        star.x = Math.round(random(10,190));
        star.velocityY = 2;
        star.lifetime = 600;
        star.scale = 0.07;
        star.debug = false;
        starsGroup.add(star);
        star.setCollider("circle",0,0,500);
        //console.log(star.height);
    }
}

function spawnDragons() {
    if(frameCount%560 == 0) {
        dragon = createSprite(200,-150);
        dragon.addImage(dragonImg);
        dragon.x = Math.round(random(10,190));
        dragon.velocityY = 1;
        dragon.lifetime = 1300;
        dragon.scale = 0.3;
        dragonsGroup.add(dragon);
        dragon.debug = false;
        dragon.setCollider("rectangle",0,0,dragon.width-100,dragon.height-100);

        warning = createSprite(200, -50);
        warning.addImage(warningImg);
        warning.x = dragon.x
        warning.velocityY = 2;
        warning.lifetime = 600;
        warning.scale = 0.5;
        warningsGroup.add(warning);
    }
}